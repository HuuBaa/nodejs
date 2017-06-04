var klass= require('./klass')


exports.add = function(klasses){
    klasses.forEah(function(item,index){
        var _klass = item
        var teacherNmae = item.teacherNmae
        var students = item.students
        klass.add(teacherNmae,students)
    })
    
}