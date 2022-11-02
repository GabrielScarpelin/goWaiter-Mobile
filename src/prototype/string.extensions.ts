interface String {
    haveLetter(findLetter: string): boolean
}

String.prototype.haveLetter = function (findLetter: string){ //Adicionada ao prototipo do objeto da string para ter um método universal de verificar se aquela palavra contém determinada char
    for (let i = 0; i < this.length; i++){
        if (this.charAt(i) === findLetter) return true
    }
    return false
}

