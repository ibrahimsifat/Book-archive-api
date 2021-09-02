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
const contant2 = document.getElementById('contant2')

//loading spainner toggle function
const togglespaner = displaystyle => {
    loding.style.display = displaystyle
}

// add addEventListener on submit btn
submitBtn.addEventListener('click', () => {

    //spaner loading
    togglespaner('block')
        // get input value
    const inputValue = inputFeild.value
        // api convarting from json
    fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
        .then(res => res.json())
        .then(data => displayBook(data))
})
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
    piecesResult.innerText = `Search Result: ${bookData.numFound} pieces`

    const bookArray = bookData.docs
        //gatting array one by one by forEach
    bookArray.forEach(book => {
        const createDiv = document.createElement('div')
        createDiv.classList.add('card')
        createDiv.classList.add('mb-2')
        createDiv.innerHTML = `

<div class="card-body row d-flex justify-content-center align-items-center
">
<div class="left col-2">
    <img class='w-100' src="https://covers.openlibrary.org/b/id/${book.cover_i?book.cover_i:'&#128542'}-M.jpg" alt="">
</div>
<div class="right ps-3 col-8 ">
    <h5 id="book-name fw-light"><span class='tag'>Book Name:</span> ${book.title?book.title:'Unknown author'}</h5>
    <p id="book-author"> <span class='tag'>Author:</span> ${book.author_name?book.author_name[0]:'Unknown author'}</p>
    <p id="book-publisher"> <span class='tag'>Publisher:</span> ${book.publisher?book.publisher[0]:'Unknown publisher'}</p>
    <small id="first-publish-date">  <span class='tag'>First Pulish In:</span> ${book.publish_date?book.first_publish_year:'Unknown Publish Date'}</small>
</div>
<div class='col-2 ms-auto ' >
<a href="#" onclick="getDetails('${book}')" class="btn btn-dark ">Details</a>

</div>
</div>
`
        contant.appendChild(createDiv)
            // stop sprning 
        togglespaner('none')
    });
}

// get details of book function
const getDetails = bookdetails => {
    console.log('I get Details')
}