const { threadId } = require("worker_threads")

class InvalidId extends Error {}

class Contenedor{
    constructor(){
        this.data = []
    }

    save(object){
        object.id = this.getNextId(this.data)
        this.data.push(object)
        return object.id
    }

    getAll() {
        return this.data
    }

    getById(id){
        if (this.hasId(id)) {
            let itemSearched
            this.data.forEach(element => {
                if (element.id === id) {
                  itemSearched = element
                }
              })
            return itemSearched
        }
        throw new InvalidId
    }


    deleteById(id){
        if ( this.hasId(id) ){
            this.data = this.data.filter(x => {
                return x.id !== id
              })
        } else {
            throw new InvalidId
        }
    }

    replaceById(object, id){
        if ( this.hasId(id) ){
            this.deleteById(id)
            object.id = id
            this.data.push(object)
        } else {
            throw new InvalidId
        }
    }

    getNextId (objects) {
        const array = objects.map(x => x.id)
        if (array.length === 0) { return 1 }
    
        return Math.max(...array) + 1
    }

    hasId(id){
        const ids = this.data.map( x => x.id)
        return ids.includes(id)
    }
}

module.exports = Contenedor