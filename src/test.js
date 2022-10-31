class Test {
    init(){
        throw 'no init'
    }
}

class Test1 extends Test {

    init(){
        console.log('some method')
    }
}