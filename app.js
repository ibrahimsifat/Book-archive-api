//selection by id
const contant = document.getElementById('contant')
const inputFeild = document.getElementById('inputFeild')
const submitBtn = document.getElementById('applyBtn')
const bookAuthor = document.getElementById('book-author')
const bookName = document.getElementById('book-name')
const fsPublishDate = document.getElementById('first-publish-date')
const piecesResult = document.getElementById('pieces-found')
const notfoundText = document.getElementById('notfound')
const loding = document.getElementById('loding')

//loadign spaner function
const togglespaner = displaystyle => {
    return loding.style.display = displaystyle
}



// add addEventListener on submit btn
submitBtn.addEventListener('click', () => {
    // get input value
    const inputValue = inputFeild.value

    //spaner loading
    togglespaner('block')

    // api convarting from json
    fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
        .then(res => res.json())
        .then(data => displayBook(data))


})



// get book cover picture function

// getCoverPic()


// displaying function 

const displayBook = bookData => {
    //clear inputValue
    inputFeild.value = ''
        // clear html containt
    contant.textContent = ''

    //if not found book
    if (bookData.numFound === 0) {
        notfoundText.classList.add('showcount')
    }
    //how many pieces found
    piecesResult.classList.add('overflow-hidden')
    piecesResult.innerText = `Search ${bookData.numFound} piece`

    const bookArray = bookData.docs
        //gatting array one by one by forEach
    bookArray.forEach(book => {
        console.log(book);
        // console.log(book);
        const createDiv = document.createElement('div')
        createDiv.classList.add('card')
        createDiv.classList.add('mb-2')
        createDiv.innerHTML = `

<div class="card-body row d-flex justify-content-center align-items-center
">
<div class="left col-2">
    <img class='w-100' src="https://covers.openlibrary.org/b/id/${book.cover_i?book.cover_i:'&#128542'}-M.jpg" alt="">
</div>
<div class="right ps-3 col-4 ">
    <h4 id="book-name">${book.title?book.title:'Unknown author'}</h4>
    <p id="book-author">${book.author_name[0]?book.author_name[0]:'Unknown author'}</p>
    <small id="first-publish-date">${book.publish_date[0]?book.publish_date[0]:'Unknown Book Name'}</small>
</div>
<div class='col-2 ms-auto ' >
<a href="#" class="btn btn-primary ">Button</a>

</div>
</div>

`
        contant.appendChild(createDiv)
            // stop sprning 
        togglespaner('none')

    });

    // console.log(bookData.docs);
}