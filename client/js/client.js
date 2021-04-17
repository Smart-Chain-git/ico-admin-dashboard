console.log('Hello! I am client.js inside client/js/...');
console.log('...This comment is on line 2 of client.js');

// Insert the 'Hey there!' text on the template page
document.getElementById('greeting').innerText = 'Smartlink ICO dashboard';

let x = document.querySelectorAll(".amount");
        for (let i = 0, len = x.length; i < len; i++) {
            let num = Number(x[i].innerHTML)
                      .toLocaleString('en');
            x[i].innerHTML = num;
        }
