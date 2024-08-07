prediction_1=""

Webcam.set({
   width:350,
   height:300,
   image_format:'png' ,
   png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot()
    {
        Webcam.snap(function(data_uri){
            document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';

        });
    }

    console.log('ml5 version:',ml5.version);

    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ySs5CJTzd/',modelLoaded);

    function modelLoaded(){
        console.log('Model Loaded!');
    }

    function speak()
        {
            var synth = window.speechSynthesis;
            speak_data_1 = "the first prediction is "+prediction_1;
            var utterThis = new SpeechSynthesisUtterance(speak_data_1);
            synth.speak(utterThis);
        }

        function check(){
            img = document.getElementById("captured_image");
            classifier.classify(img,got_result);
        }

        function got_result(error,results){
            if(error){
                console.log(error)
            }else{
                console.log(results)
                document.getElementById("result_emotion_name").innerHTML=results[0].label;
                document.getElementById("result_emotion_name2").innerHTML=results[1].label;
                prediction_1 = results[0].label;
                speak();
                if(results[0].label=="amazing"){
                    document.getElementById("update_emoji").innerHTML ="&#128076;";
                    document.getElementById("lines").innerHTML = "AMAZING";

                }
                if(results[0].label=="victory"){
                    document.getElementById("update_emoji").innerHTML ="&#9996;";
                    document.getElementById("lines").innerHTML = "VICTORY";
                }
                if(results[0].label=="best"){
                    document.getElementById("update_emoji").innerHTML ="&#128077;";
                    document.getElementById("lines").innerHTML = "BEST";
                }
                

            }
        }