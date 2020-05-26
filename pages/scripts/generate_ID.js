// Случайная генерация ID

// Функция вызова генерации случайного ID
// со сверкой сгенерированного ID с уже сгенерированными ранее
export function getID(i, set_r) {
    let string_r;
    do {
        string_r = randomString(i)
    } while (set_r.has(string_r))
    set_r.add(string_r);
    return string_r
}

// Функция случайной генерации ID
function randomString(i) {
    let rnd = '';
    while (rnd.length < i) 
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};