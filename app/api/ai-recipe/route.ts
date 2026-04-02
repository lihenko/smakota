export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return Response.json(
        { error: 'No ingredients provided' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: `
            Ти — кулінарний AI.

            ВАЖЛИВО:
            - Згенеруй РІВНО 3 різні рецепти
            - Відповідай ТІЛЬКИ валідним JSON
            - Без тексту, без пояснень
            - Розгорнуті кроки приготування
            - Рецепти повинні бути виключно українською мовою

            Формат:
            {
              "recipes": [
                {
                  "title": "Назва рецепту",
                  "ingredients": ["..."],
                  "steps": ["..."]
                }
              ]
            }
            `.trim(),
          },
          {
            role: 'user',
            content: `Інгредієнти: ${ingredients.join(', ')}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OPENAI ERROR:', data);

      return Response.json(
        { error: 'SERVICE_UNAVAILABLE' }, // 👈 для фронта
        { status: 500 }
      );
    }

    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return Response.json(
        { error: 'EMPTY_RESPONSE' },
        { status: 500 }
      );
    }

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error('JSON PARSE ERROR:', text);

      return Response.json(
        { error: 'INVALID_JSON' },
        { status: 500 }
      );
    }

    // 🔥 додаткова перевірка
    if (!Array.isArray(parsed.recipes)) {
      return Response.json(
        { error: 'INVALID_STRUCTURE' },
        { status: 500 }
      );
    }

    return Response.json(parsed);

  } catch (e: any) {
    console.error('SERVER ERROR:', e);

    return Response.json(
      { error: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}