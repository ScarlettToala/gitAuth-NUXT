export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    return {sensitive: "logged-only"}
})

//comprueba si la cookie esta activa 