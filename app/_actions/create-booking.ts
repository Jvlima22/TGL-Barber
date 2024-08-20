"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

// Definição da interface para o usuário
interface User {
  id: string
  name?: string
  email?: string
  image?: string
}

// Atualização da interface de sessão
interface Session {
  user?: User
}

interface CreateBookingParams {
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  // Obtém a sessão do servidor
  const session = (await getServerSession(authOptions)) as Session

  // Verifica se o usuário está autenticado
  if (!session.user || !session.user.id) {
    throw new Error("Usuário não autenticado!")
  }

  // Cria a reserva no banco de dados
  await db.booking.create({
    data: {
      ...params,
      userId: session.user.id, // Garante que o ID do usuário está presente
    },
  })

  // Revalida o caminho para atualizar a página com a nova reserva
  revalidatePath("/barbershops/[id]")
}
