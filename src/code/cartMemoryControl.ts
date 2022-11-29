import AsyncStorage from '@react-native-async-storage/async-storage';

const getCart = async ()=>{
    try {
        const carrinhoData = await AsyncStorage.getItem('carrinho')
        return carrinhoData != null ? JSON.parse(carrinhoData) : []
    }
    catch(erro){
        return erro
    }
}
const addOnCart = async (item: object)=>{
    const carrinho = await getCart()
    if (typeof(carrinho) == 'object'){
        carrinho.push(item)
        await AsyncStorage.setItem('carrinho', JSON.stringify(carrinho))
    }
    else if (carrinho === null){
        const initCart = []
        initCart.push(item)
        await AsyncStorage.setItem('carrinho', JSON.stringify([item]))
    }
    return 'added'
}
const deleteOnCart = async (indexParam: number) =>{
    const carrinho = await getCart()
    const newCarrinho = carrinho.filter((value:string, index:number) => index != indexParam)
    await AsyncStorage.setItem('carrinho', JSON.stringify(newCarrinho))
    return await getCart()
}
const cleanCarrinho = async () =>{
    await AsyncStorage.setItem('carrinho', '')
}
export {addOnCart, getCart, deleteOnCart, cleanCarrinho}