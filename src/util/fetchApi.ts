export class FetchApi {
  static async GetFetch<T>(path: string, token?: string): Promise<T | void> {
    const headers: { "Content-Type": string; Authorization?: string } = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const params = {
      method: "GET",
      headers: headers,
    };
    try {
      const res = await fetch(path, params);
      return res.json().then((res) => res);
    } catch (error) {
      console.error(error);
    }
  }

  static async PostFetch<T>(path: string, data: T) {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(path, params);
      return res.json().then((res) => res);
    } catch (error) {
      console.error(error);
    }
  }

  static async PutFetch<T>(path: string, data: T) {
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(path, params);
      return res.json().then((res) => res);
    } catch (error) {
      console.error(error);
    }
  }

  static async DeleteFetch(path: string, id: number | string, keyName?: string) {
    const key = keyName ? keyName : "id";
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [key]: id }),
    };
    console.log(params);
    try {
      const res = await fetch(path, params);
      return res.json().then((res) => res);
    } catch (error) {
      console.error(error);
    }
  }
}
