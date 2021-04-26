$(document).ready(function(){

    const interval = setInterval(function() {
        getdata();
    }, 5000);
    getdata();

    function getdata(){  
        $.ajax({  
            url:'/task/getdata',  
            method:'get',  
            dataType:'json',  
            success:function(response){
                console.log(response.msg);
                    if(response.msg=='success'){  
                        $('#last_update').html(new Date());
                        console.log(response.d1);
                        $('#validated').html(response.d1);
                        $('#validated_and_pending').html(response.d2);
                        $('#all_funds').html(response.d3);
                        let x = document.querySelectorAll(".amount");
                        for (let i = 0, len = x.length; i < len; i++) {
                            let num = Number(x[i].innerHTML)
                                    .toLocaleString('en');
                            x[i].innerHTML = num + "<span>&#36;</span>";
                        }
                    }  
            },  
            error:function(response){  
                alert('server error');
            }  
        });  
    }
});  