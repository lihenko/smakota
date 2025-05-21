import { redirect } from 'next/navigation'
import { prisma } from '@/app/lib/prisma'
import RecipeCard from '@/app/components/RecipeCard'
import Filter from '@/app/components/FilterMyRecipes'
import Pagination from '@/app/components/Pagination'
import RecipeSearchForm from '@/app/components/SearchForm'
import UserMenu from '../UserMenu'
import { getUser } from '../pageSetting'

export const dynamic = 'force-dynamic'

export default async function MyRecipesPage({
  searchParams,
}: {
  searchParams?: {
    page?: string
    dishTypeId?: string
    ingredientIds?: string
  }
}) {
  const currentUser = await getUser()

  if (!currentUser) {
    return <p>Будь ласка, увійдіть у свій акаунт, щоб бачити ваші рецепти.</p>
  }
  const searchParamsData = await searchParams;
  const page = Number(searchParamsData?.page) || 1
  const dishTypeId = searchParamsData?.dishTypeId ? Number(searchParamsData.dishTypeId) : undefined
  const ingredientIds = searchParamsData?.ingredientIds
    ? searchParamsData.ingredientIds.split(',').map(Number)
    : []

  if (isNaN(page) || page < 1) {
    redirect('/dashboard/myrecipes')
  }

  const pageSize = 12
  const skip = (page - 1) * pageSize

  const where: any = {
    userId: currentUser.id,
    ...(dishTypeId && { dishTypeId }),
    ...(ingredientIds.length > 0 && {
      AND: ingredientIds.map((id) => ({
        ingredients: {
          some: {
            ingredientId: id,
          },
        },
      })),
    }),
  }

  const [recipes, totalCount, dishTypes, ingredients] = await Promise.all([
    prisma.recipe.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
      include: { user: true, dishType: true },
    }),
    prisma.recipe.count({ where }),
    prisma.dishType.findMany({ orderBy: { name: 'asc' } }),
    prisma.ingredient.findMany({ orderBy: { name: 'asc' } }),
  ])

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <>
      <UserMenu currentUser={currentUser} />

      <main className="py-16">
        <div className="container">
          <h1 className="text-3xl font-bold mb-6 text-center">Мої рецепти</h1>
          <Filter
            dishTypes={dishTypes}
            ingredients={ingredients}
            currentDishTypeId={dishTypeId}
            currentIngredientIds={ingredientIds}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {recipes.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
                Рецепти не знайдено
              </p>
            ) : (
              recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
            )}
          </div>

          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} basePath="/dashboard/myrecipes" />
          )}
        </div>
      </main>
    </>
  )
}
