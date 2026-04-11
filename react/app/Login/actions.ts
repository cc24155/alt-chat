"use server"; 

// import { db } from "@/lib/db"; // Seu Prisma, Mongoose, etc.

/*export async function autenticarUsuario(formData: FormData) {
  const email = formData.get("");
  const password = formData.get("")
  
  // Aqui você faz a mágica no banco de dados
  // const usuario = await db.user.findUnique({ where: { email } });
  
  console.log("Validando no banco de dados...");
  return { success: true };
}*/

export async function autenticarUsuario(user: string, password: string){
  //const usuario = await db.user.findUnique({ where: { user } });
}