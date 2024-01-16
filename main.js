

let url = new URL(location.href)
let splitUrl = url.pathname.split('/')
let fileName = splitUrl[splitUrl.length - 1]
let userId = url.searchParams.get('id')
let postId = url.searchParams.get('postId')

if (fileName === 'index.html') {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(value => value.json())
        .then(users => {
            let div_users = document.createElement('div')
            div_users.classList.add('div_users')

            for (const user of users) {
                let div_user = document.createElement('div')
                div_user.classList.add('div_user')
                div_user.innerText = `id - ${user.id}\n Name - ${user.name}`

                let button_user = document.createElement('a')
                button_user.classList.add('button_user')
                button_user.innerText = 'user details'
                button_user.href = `user-details.html?id=${user.id}`;

                div_user.append(button_user)
                div_users.append(div_user)
            }
            document.body.append(div_users)
        })
}
if (fileName === 'user-details.html') {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(value => value.json())
        .then(userInfo => {
            let div_details = document.createElement('div')
            div_details.classList.add('div_details')
            let div_info = document.createElement('div')
            div_info.classList.add('div_info')
            let h1_user_info = document.createElement('h1')
            h1_user_info.classList.add('h1_user_info')

            h1_user_info.innerText = 'USER INFO'
            function iterator(userInfo) {
                for (const userInfoKey in userInfo) {

                    if (typeof userInfo[userInfoKey] === 'object') {
                        let p = document.createElement('p')
                        p.classList.add('text_user_info')
                        p.innerText = userInfoKey + ':'
                        div_info.append(p)
                        iterator(userInfo[userInfoKey])
                    }

                    if (typeof userInfo[userInfoKey] !== 'object') {
                        let p_user_info = document.createElement('p')
                        p_user_info.classList.add('p_user_info')
                        p_user_info.innerText = userInfoKey + ':  ' + userInfo[userInfoKey]

                        div_info.append(p_user_info)
                    }

                }
            }

            let button_post = document.createElement('button')
            button_post.classList.add('button_post')
            button_post.innerText = 'post of current user'

            button_post.addEventListener('click', function (ev) {
                ev.preventDefault()
                button_post.disabled = 'true'
                fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                    .then(value => value.json())
                    .then(posts =>{
                        let main_div_post = document.createElement('div')
                        main_div_post.classList.add('main_div_post')
                        for (const post of posts) {
                            let div_post = document.createElement('div')
                            div_post.classList.add('div_post')
                            div_post.innerText = `Id: ${post.id}\nTitle: ${post.title}`
                            let button_post = document.createElement('a')
                            button_post.classList.add('button_post_details')
                            button_post.innerText = 'Post Details'
                            button_post.href = `post-details.html?id=${userId}&postId=${post.id}`

                            div_post.append(button_post)
                            main_div_post.append(div_post)
                            document.body.append(main_div_post)
                        }
                    })
            })

            div_details.append(div_info)
            document.body.append(h1_user_info,div_details, button_post)
            iterator(userInfo)
        })
}
if(fileName === 'post-details.html'){
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(value => value.json())
        .then(postInfo=>{
            let block_post = document.createElement('div')
            block_post.classList.add('block_post')
            for (const postInfoKey in postInfo) {
                let p_post = document.createElement('p')
                p_post.innerText =postInfoKey + ': '+ postInfo[postInfoKey]
                block_post.append(p_post)
            }
            document.body.append(block_post)
            return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        })

        .then(value => value.json())
        .then(posts=>{
            let main_div_post_details = document.createElement('div')
            main_div_post_details.classList.add('main_div_post_details')
            for (const post of posts) {
                let div_post_details = document.createElement('div')
                div_post_details.classList.add('div_post_details')
                for (const postKey in post) {
                    let p = document.createElement('p')
                    p.innerText = `${postKey}: ${post[postKey]}`
                    div_post_details.append(p)
                    main_div_post_details.append(div_post_details)
                }
            }
            document.body.append(main_div_post_details)
        })
}

// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users +
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.+
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули+



//
//
// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули+
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)+
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.+
//
//     На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .+
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)+
//
// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.+
//     user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.+
//     блоки з короткою іфною про post - в ряд по 5 .+
//     post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.+
//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)+