var display = document.getElementById('display');
var minutos = document.getElementById('minutos');
var segundos = document.getElementById('segundos');
var comecar = document.getElementById('comecar');
var parar = document.getElementById('parar');

parar.style.display = "none";
        var cronometroSeg;

        var minutoAtual;
        var segundoAtual;

        var interval;

        for(var i = 0; i <= 60; i++){
            minutos.innerHTML+='<option value="'+i+'">'+i+'</option>';
        }

        for(var i = 1; i <= 60; i++){
            segundos.innerHTML+='<option value="'+i+'">'+i+'</option>';
        }

        do
        {
            comecar.addEventListener('click',function(){
                minutoAtual = minutos.value;
                segundoAtual = segundos.value;
                forcarParada();
                display.childNodes[1].innerHTML = minutoAtual + ":"+segundoAtual;
                comecar.style.display = "none";
                interval = setInterval(function(){
                    
                    segundoAtual--;
                    if(segundoAtual <= 0){
                        if(minutoAtual > 0){
                            minutoAtual--;
                            segundoAtual = 59;
                        }else{
                            var som = document.getElementById("sound");
                            som.play();
                            clearInterval(interval);
                            if(Push.Permission.get() != "granted"){
                                    Push.Permission.request();
                            }
                        
                            if(Push.Permission.get() == "granted"){
                                Push.create('O TEMPO ACABOU!!!', {
                                body: 'Seu alarme acaba de disparar, Toque para parar.',
                                icon: 'favicon.ico',
                                timeout: 8000,
                                vibrate: [100,100,100],
                                onClick: function(){
                                    window.location.href="https://luigi-raynel-dev.github.io/temporizador/";
                                }
                        
                                });
                        
                            }
                            
                        }
                    }
                    
                    display.childNodes[1].innerHTML = minutoAtual + ":"+segundoAtual;
                },1000);


    })
}while(parada == true);

function forcarParada(){
    parar.style.display = "block";
    parar.addEventListener('click', () => {
        window.location.reload();
    })    
}