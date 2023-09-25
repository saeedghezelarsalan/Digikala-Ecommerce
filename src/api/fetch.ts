type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchDataProps {
  method: HttpMethod,
  url: string | {
    pathname?: string;
    query?: string | number;
  };
  body?: Record<string, any>
}

export async function fetchData(
  {
    method,
    url,
    body,
  }: FetchDataProps) {

  const apiPath = typeof url === 'string'
    ? new URL(`${process.env.API_BASE_URL}/${url}`)
    : new URL(
      `${process.env.API_BASE_URL}/${url.pathname}/${url.query ? `${url.query}` : ''}`
    );

  if (body) {
    Object.entries(body).forEach(([key, value]) => {
      apiPath.searchParams.append(key, value);
    });
  }

  try {
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(apiPath.toString(), requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}