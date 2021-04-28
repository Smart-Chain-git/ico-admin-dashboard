$(document).ready(function(){

    const interval = setInterval(function() {
        getdata();
    }, 30000);
    getdata();

    function getdata(){  
        $.ajax({  
            url:'/task/getdata',  
            method:'get',  
            dataType:'json',  
            success:function(response){
                console.log(response.msg);
                    //if(response.msg=='success'){  
                        $('#last_update').html(new Date());
                        console.log(response.d1);
                        console.log(response.d2);
                        console.log(response.d3);
                        console.log(response.d4);
                        console.log(response.d5);
                        console.log(response.d6);
                        $('#validated').html(response.d1);
                        $('#validated_and_pending').html(response.d2);
                        $('#all_funds').html(response.d3);
                        $('#presale_reserved').html(response.d5);
                        $('#ico_reserved').html(response.d6);
                        $('#total_reserved').html(response.d4);
                        $('#presale_remaining').html(71432562-response.d5);
                        $('#ico_remaining').html(200000000-response.d6);
                        $('#total_remaining').html(271432562-response.d4);
                        let x = document.querySelectorAll(".amount");
                        for (let i = 0, len = x.length; i < len; i++) {
                            let num = Number(x[i].innerHTML)
                                    .toLocaleString('en');
                            x[i].innerHTML = num + "<span>&#36;</span>";
                        }
                        let y = document.querySelectorAll(".smak");
                        for (let i = 0, len = y.length; i < len; i++) {
                            let num = Number(y[i].innerHTML)
                                    .toLocaleString('en');
                            y[i].innerHTML = num;
                        }
                    //}  
            },  
            error:function(response){  
                alert('server error');
            }  
        });  
    }
});  