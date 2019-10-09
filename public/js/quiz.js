
// user auth

async function main() {
    let db = firebase.firestore();
    var refCollection = db.collection("Question");
    var userId;
    let items = [];
    let inpromise = new Promise((resolve) => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                userId = user.uid;
                db.collection("Users").doc(userId).get().then((doc) => {
                    if (doc.exists) {
                        console.log('AJSDNASJDNJNASNDASNDJ')
                        doc.data().items.forEach(el => {
                            items.push(el);
                        })
                    }
                    resolve();
                })
            }
        });
    })

    await inpromise;
    console.log(1);
    let life = 2;
    console.log(items);

    document.getElementById('too').innerHTML = 'X' + life;

    let lvl = 1;

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }


    let questionIndex = 0;

    let questions = [];
    let item = "";

    let itemUrl = '';


    let rd = 1;

    refCollection.where('random', '==', rd).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data())
                item = doc.id;
                itemUrl = doc.data().manUrl;
                questions = doc.data().questions;
                itemUrl = doc.data().manUrl;
                console.log(questions)
                renderQuestion(questions[questionIndex])
            })
        });

    function renderQuestion(question) {
        console.log(question);
        let questionEl = document.getElementById('question');
        questionEl.innerHTML = '';

        document.getElementById('hint_heseg').innerHTML = 'Асуулт: ' + lvl;
        lvl++;

        let answerEl = document.createElement('h4');
        answerEl.classList.add("goy");
        answerEl.id = 'asuult';
        answerEl.innerHTML = questions[questionIndex].question;
        questionEl.appendChild(answerEl);


        for (let i = 0; i < questions[questionIndex].answer.length; i++) {
            let optionEl = document.createElement('div');
            optionEl.className = 'option';
            optionEl.innerHTML = questions[questionIndex].answer[i].value;
            optionEl.id = i;
            optionEl.onclick = choose;
            optionEl.classList.add("goy");
            questionEl.appendChild(optionEl);
        }

        questionEl.style.display = "block";
    }

    function pushItem() {
        const itemCollection = db.collection("Users");
        itemCollection.doc(userId).get().then(val => {
            let data = val.data();
            console.log(data);
            data.items.push({
                item: item,
                itemUrl: itemUrl
            });
            itemCollection.doc(userId).update(data).then(k => {
                document.location.href = 'sparkle.html';
                console.log('amjiltttai nemlee');
            }).catch(err => {
                console.log('from push item', err)
            })


        }).catch(err => {
            console.log('from push item', err)
        })
    }

    function choose() {
        let answerId = this.id;
        if (questionIndex < questions.length && questions[questionIndex].answer[answerId].right === true) {
            console.log('zov')
            questionIndex++;
            if (questionIndex != questions.length) {
                renderQuestion(question[questionIndex - 1]);
            } else {
                rd++;
                console.log('question duuslaa');
                console.log('userId:', userId)
                pushItem();
            }
        } else {
            console.log('buruu')
            life--;
            console.log(life)
            if (life == 0) {
                function butsah() {
                window.location = "./profile.html"
                }   
            }
            document.getElementById('too').innerHTML = 'X' + life;
            this.style.borderColor = 'red';
        }
    }

}

function butsah() {
    window.location = "./profile.html"
}
main();

