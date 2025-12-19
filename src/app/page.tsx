"use client";

import { useEffect, useState } from "react";
import Content from "./components/Content";
import Loader from "./components/loader";
import { getUsers, PUBLICID } from "./services/api";
import { useHeroes } from "./context/HeroesContext";

type ApiUser = { publicId: string; name?: string };

export default function Home() {
  const { loading, selectedPublicId, setSelectedPublicId } = useHeroes();

  const [usersLoading, setUsersLoading] = useState(true);
  const [users, setUsers] = useState<ApiUser[]>([]);

  useEffect(() => {
    const run = async () => {
      setUsersLoading(true);
      try {
        const res = await getUsers();
        const list: ApiUser[] =
          Array.isArray(res) ? res :
          Array.isArray((res as any)?.users) ? (res as any).users :
          Array.isArray((res as any)?.data) ? (res as any).data :
          [];
        setUsers(list);
      } catch (err) {
        console.error("getUsers failed", err);
        setUsers([]);
      } finally {
        setUsersLoading(false);
      }
    };

    run();
  }, []);

  return (
    <main className="fav-and-heroes">
      <section style={{ marginBottom: 20 }}>
        <label style={{ marginRight: 8 }}>Utilizador Selecionado:</label>

        {usersLoading ? (
          <span>A carregar utilizadores...</span>
        ) : (
          <select
            value={selectedPublicId}
            onChange={(e) => setSelectedPublicId(e.target.value)}
          >
            {!users.some((u) => u.publicId === PUBLICID) && (
              <option key={PUBLICID} value={PUBLICID}>
                {PUBLICID}
              </option>
            )}

            {users.map((u) => (
              <option key={u.publicId} value={u.publicId}>
                {u.name ?? u.publicId}
              </option>
            ))}
          </select>
        )}
      </section>

      {loading ? <Loader /> : <Content />}
    </main>
  );
}
