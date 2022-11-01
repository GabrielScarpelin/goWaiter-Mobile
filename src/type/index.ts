type myTabParamsList = {
    Home: {
      id: string,
      nome: string,
      uri_foto_usuario: string,
    },
    Search: {
      id: string,
      uri_foto_usuario: string
  
    }
    Pedidos: {
      id: string,
      nome: string,
    },
    Perfil: {
      id: string,
      nome: string,
      uri_foto_usuario: string,
      email: string,
      telefone: string
    },
    Cart: {
      id: string,
      nome: string,
      email: string
    }
}
export default myTabParamsList 