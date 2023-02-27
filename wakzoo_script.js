setTimeout(() => {
    function imageDownloader() {
        const images = [...document.getElementsByClassName('se-image-resource')];
        images.forEach((image)=>{
            let touchStart;
            image.addEventListener("touchstart", (event) => {
                touchStart = event.timeStamp;
                setTimeout(() => {
                    const touchEnd = event.timeStamp;
                    if (touchEnd - touchStart >= 1000) { // long press duration
                // Perform long press action here
                    alert("Long press!");
                    }
                }, 1000); // Delay in milliseconds
            });
        });
    }
    function outerConcealer() {
        const thumbnails = [...document.getElementsByClassName('thumb')];
        thumbnails.forEach((element)=>element.getElementsByTagName('picture')[0].remove());
        let nicknames = [document.getElementsByClassName('end_user_nick')[0].getElementsByClassName('ellip')[0],...document.getElementsByClassName('reply_to'),...[...document.getElementsByClassName('nick_name')].map((element)=>element.getElementsByClassName('ellip')[0])];
        let nicknameTexts = new Set(nicknames.map((element)=>element.innerHTML));
        nicknameTexts = [...nicknameTexts];

        let counter = 0;
        for (let text of nicknameTexts) {
            for (let nickname of nicknames) {
                if (text==nickname.innerText) {
                    if (nicknameTexts.indexOf(text)==0) {
                        nickname.innerText="[작성자팬치]";
                    }
                    else{nickname.innerText=`[팬치 ${counter}]`;}
                }
            }
            counter+=1;
        }
    }
    function innerConcealer() {
        const thumbnails = [...document.getElementsByClassName('thumb')];
        thumbnails.forEach((element)=>element.getElementsByTagName('picture')[0].remove());
        let nicknames = [...document.getElementsByClassName('nick_name'),...document.getElementsByClassName('reply_to')];
        let nicknameTexts = new Set(nicknames.map((element)=>element.innerText));
        nicknameTexts = [...nicknameTexts];
        let writer = '';
        nicknames.forEach((element)=> element.parentElement.parentElement.getElementsByClassName('writer_tag')[0] ? writer = element.innerText : null);

        let counter = 0;
        for (let text of nicknameTexts) {
            for (let nickname of nicknames) {
                if (text==nickname.innerText) {
                    if (text == writer) {
                        nickname.innerText="[작성자팬치]";
                    }
                    else{nickname.innerText=`[팬치 ${counter+1}]`;}
                }
            }
            counter+=1;
        }
    }
    function pickComment() {
        
    }
    function articleAlert() {
        if (document.getElementsByClassName('CafeMemberArticleItem board_box')[0]==undefined) {
            const articles = document.getElementsByClassName('list_area');
            const alertElement = document.createElement('li');
            alertElement.className='board_box';
            const alertText = document.createTextNode('15 SAFE LINE');
            alertElement.appendChild(alertText);
            alertElement.style.backgroundColor = '#a4b15f95';
            alertElement.style.textAlign = 'center';
            alertElement.style.color = '#FFFFFF';
            alertElement.style.marginTop = '5px';
            alertElement.style.marginBottom = '5px';
            alertElement.style.height = '35px';
            
            document.getElementsByClassName('comment_inner')[14].style.backgroundColor = '#a4b15f95';
        }
    }
    function addNickConcealer() {
        try {
            const userWrap = document.querySelector("#ct > div.post_title > div.user_wrap");
            const outerConcealerBtn = document.createElement('button');
            outerConcealerBtn.className='btn_subscribe nick_outerConcealerBtn';
            outerConcealerBtn.innerHTML = '익명화';
            outerConcealerBtn.style.marginRight = '80px';
            outerConcealerBtn.onclick = outerConcealer;
            document.getElementsByClassName('nick_outerConcealerBtn')[0]!=undefined ? null : userWrap.appendChild(outerConcealerBtn);
       }catch{}
        
       try {
           const innerConcealerBtn = document.createElement('button');
           innerConcealerBtn.className = 'btn_sort nick_innerConcealerBtn';
           innerConcealerBtn.innerHTML = '익명화';
           innerConcealerBtn.onclick = innerConcealer;
           
           const btnArea = document.getElementsByClassName('sort_area')[0];
           if (document.getElementsByClassName('btn_sort on')[0]) {
               document.getElementsByClassName('nick_innerConcealerBtn')[0]!=undefined ? null : btnArea.appendChild(innerConcealerBtn);
           }
       }catch{}
    }
    function addCommentPicker() {
        // create the dialog element
        const dialog = document.createElement("dialog");
        dialog.id = "comment_picker_dialog";

        // create the form element
        const form = document.createElement("form");
        form.style.display = "flex";
        form.style.flexDirection = "column";
        form.method = "dialog";

        // create the input element for number of winners
        const numberOfWinnersInput = document.createElement("input");
        numberOfWinnersInput.type = "number";
        numberOfWinnersInput.style.width = "80px";
        numberOfWinnersInput.min = "1";
        numberOfWinnersInput.placeholder = "추첨인원";

        // create the label element for duplicate checkbox
        const duplicateLabel = document.createElement("label");
        duplicateLabel.htmlFor = "duplicate";
        duplicateLabel.textContent = "중복 허용";

        // create the checkbox element for duplicate option
        const duplicateCheckbox = document.createElement("input");
        duplicateCheckbox.id = "duplicate";
        duplicateCheckbox.type = "checkbox";

        // append the checkbox to the label
        duplicateLabel.appendChild(duplicateCheckbox);

        // create the button element for picking winners
        const pickButton = document.createElement("button");
        pickButton.classList.add("btn_sort pick_button");
        pickButton.textContent = "추첨하기";
        pickButton.onclick = pickComment;

        // append all the elements to the form
        form.appendChild(numberOfWinnersInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(duplicateLabel);
        form.appendChild(document.createElement("br"));
        form.appendChild(pickButton);

        // append the form to the dialog
        dialog.appendChild(form);

        const btnArea = document.getElementsByClassName('sort_area')[0];
        if (document.getElementsByClassName('btn_sort on')[0]) {
            document.getElementsByClassName('pick_btn')[0]!=undefined ? null : btnArea.appendChild(dialog);
        }
        
    }
    function cafeEtcRemover() {
        try {
            document.getElementsByClassName("gnb_l")[0].style.opacity = '0';//cafe
            document.getElementsByClassName("gnb_home")[0].style.pointerEvents = 'none';//cafe
        }
        catch(e){}
        try {
            document.getElementsByClassName("gnd_app")[0].remove(); //앱 열기
        } catch (e) {}
        try {
            document.getElementsByClassName('go_app_bottom')[0].remove(); //카페앱 광고
        } catch (e) {}
        try {
            document.getElementsByTagName('footer')[0].remove(); //footer
        } catch (e) {}
        try {
            document.getElementsByClassName('go_app')[0].remove(); //앱 열기
        } catch (e) {}
    }
    cafeEtcRemover();
    try {
        articleAlert();
    } catch (error) {}
    try {
        addNickConcealer();
    } catch (error) {}
    try {
        imageDownloader();
    } catch (error) {}
}, 2000);
