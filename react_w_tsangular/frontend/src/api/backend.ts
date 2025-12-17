export async function doubleNumbers(values: number[]): Promise<number[]> {
    const res = await fetch("http://localhost:8000/api/double", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
    });

    if (!res.ok) {
        throw new Error("Backend error");
    }

    const data = await res.json();
    return data.result;
}
