function getTitles(array) {
    list = ""
    for (i in array) {
        if (i == 0) {
            list+=array[i].title
        }
        else if (i == array.length-1) {
            list+=` and ${array[i].title}`
        } else {
            list+= `, ${array[i].title}`
        }
    }
    return list
}

module.exports = getTitles