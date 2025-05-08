import prisma from "../lib/prisma";
import { startOfDay, endOfDay, startOfMonth, endOfMonth, subMonths } from 'date-fns';


export default async function Stat() {

    const now = new Date();

    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);

    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);

    const previousMonth = subMonths(now, 1);

    const previousMonthStart = startOfMonth(previousMonth);
    const previousMonthEnd = endOfMonth(previousMonth);

    const recipeCount = await prisma.recipe.count();
    const userCount = await prisma.user.count();

    const recipeCountPreviousMonth = await prisma.recipe.count({
        where: {
            createdAt: {
              gte: previousMonthStart,
              lte: previousMonthEnd,
            },
          },
    });
    const userCountPreviousMonth = await prisma.user.count({
        where: {
            createdAt: {
                gte: previousMonthStart,
                lte: previousMonthEnd,
            },
          },
    });

    const recipeCountThisMonth = await prisma.recipe.count({
        where: {
            createdAt: {
              gte: currentMonthStart,
              lte: currentMonthEnd,
            },
          },
    });
    const userCountThisMonth = await prisma.user.count({
        where: {
            createdAt: {
                gte: currentMonthStart,
                lte: currentMonthEnd,
            },
          },
    });

    const recipeCountToday = await prisma.recipe.count({
        where: {
            createdAt: {
              gte: todayStart,
              lte: todayEnd,
            },
          },
    });
    const userCountToday = await prisma.user.count({
        where: {
            createdAt: {
              gte: todayStart,
              lte: todayEnd,
            },
          },
    });

    return (
        <>
            <div>
                <div className="container py-16">
                    <div className="text-center">
                        <h2 className="mb-8 font-bold">За весь час</h2>
                    </div>
                    <div className="flex">
                        <div>
                            Створено рецептів:
                        </div>
                        <div>
                            { recipeCount }
                        </div>
                    </div>
                    <div className="flex">
                        <div>
                            Зареєстровано користувачів:
                        </div>
                        <div>
                            { userCount }
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="container py-16">
                    <div className="text-center">
                        <h2 className="mb-8 font-bold">За минулий місяць</h2>
                    </div>
                    <div className="flex">
                        <div>
                            Створено рецептів:
                        </div>
                        <div>
                            { recipeCountPreviousMonth }
                        </div>
                    </div>
                    <div className="flex">
                        <div>
                            Зареєстровано користувачів:
                        </div>
                        <div>
                            { userCountPreviousMonth }
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="container py-16">
                    <div className="text-center">
                        <h2 className="mb-8 font-bold">Цього місяця</h2>
                    </div>
                    <div className="flex">
                        <div>
                            Створено рецептів:
                        </div>
                        <div>
                            { recipeCountThisMonth }
                        </div>
                    </div>
                    <div className="flex">
                        <div>
                            Зареєстровано користувачів:
                        </div>
                        <div>
                            { userCountThisMonth }
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="container py-16">
                    <div className="text-center">
                        <h2 className="mb-8 font-bold">За сьогдні</h2>
                    </div>
                    <div className="flex">
                        <div>
                            Створено рецептів:
                        </div>
                        <div>
                            { recipeCountToday }
                        </div>
                    </div>
                    <div className="flex">
                        <div>
                            Зареєстровано користувачів:
                        </div>
                        <div>
                            { userCountToday }
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}
