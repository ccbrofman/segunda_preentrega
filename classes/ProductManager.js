import fs from 'fs'

class ProductManager {
    constructor(path){
        this.products = []
        this.path = path
    }

    async addProduct(producto){
        let {title, description, code, price, status, stock, category, thumbnails} = producto
    
        if(!title || !description || !price || !code  || !stock || !category){
            console.log("Tu producto se encuentra incompleto, no se registrará")
            return {error:"Tu producto se encuentra incompleto, no se registrará"}
        } 
        
        if(status == undefined){
            producto.status = true
        }

        const repetido = this.products.find((element) => element.code == producto.code)

        if(repetido != undefined){
            console.log("Ya está agregado el código de tu producto")

            return {error: "Ya está agregado el código de tu producto"}


        }
        else{
            if(this.products.length == 0){
                producto.id = 1
            }
            else{
                producto.id = this.products[this.products.length-1].id +1 
            }
            
            this.products.push(producto)
           await fs.promises.writeFile(this.path,JSON.stringify(this.products))
            return producto

        }
    }
    getProducts(){
        if(!this.products.length){
            this.products =  JSON.parse( fs.readFileSync(this.path))
        }
        return this.products
    }

    getProductById(id){
        
       
        let porId = this.products.find((element) => element.id == id)
        
        if(porId == undefined){
           return "Not found"
        }
        else{
            return porId
        }
        
    }

    async updateProduct(id,updateInfo){
        
       
        if(this.products.find((element)=>element.code == updateInfo.code) !=undefined){
            return "El código ya existe en otro producto, no se actualizará la información"
        }
        else{
            let elementoPorId = this.products.find((element) => element.id == id)
            

            if(elementoPorId == undefined){
                return {error:"Not found"}
            }
            else{
                let indicePorID = this.products.findIndex((element) => element.id == id)

                this.products[indicePorID] = {...elementoPorId,...updateInfo}
                await fs.promises.writeFile(this.path,JSON.stringify(this.products))
                return this.products[indicePorID]

            }
        }

    }

    async deleteProduct(id){
        let indicePorID = this.products.findIndex((element) => element.id == id)
        if(indicePorID != -1){
        
            this.products.splice(indicePorID, 1)
            await fs.promises.writeFile(this.path,JSON.stringify(this.products))
            return {message:"Producto Eliminado"}
        }
        else{
            return {error:"Not Found"}
        }
    }
}


export default ProductManager