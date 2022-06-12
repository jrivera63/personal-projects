$(document).ready(function(){

    // jQuery methods go here...



    // CLOSES MENU BY SETTING ID DISPLAY TO NONE   
    // function closeMenu()
    $("#overlay-menu").click(function(){
        document.getElementById("overlay-menu").style.display = 'none';
    });

    // OPENS MENU BY SETTING ID DISPLAY TO FLEX
    // function openMenu()
    $("#menu").click(function(){
        document.getElementById("overlay-menu").style.display = 'flex';
    });

    // CLEARS LIST AND TITLE VALUES
    function clearList(){
        document.getElementById("title").value = '';
        while (document.getElementById("add-items").firstChild){
            document.getElementById("add-items").firstChild.remove();
        }
    }

    // SHOWS AND HIDES THE CREATE NEW LIST MENU
    // function showhideList()
    $("#newbtn").click(function(){
        let new_list = document.getElementById("new-list");
        let newbtn = document.getElementById("newbtn");
        new_list.style.display = 'none';
    
        if (new_list.style.display === "none"){
            new_list.style.display = "block";
            newbtn.style.display = "none";
        } 
    });

    // CANCELS CURRENT LIST AND BRINGS BACK BUTTON
    // function cancelFunction()
    $("#cancel").click(function(){
        new_list = document.getElementById("new-list");
        newbtn = document.getElementById("newbtn");

        if (new_list.style.display === "block"){
            new_list.style.display = "none";
            newbtn.style.display = "block";
        } 

        clearList();
    });

    // ADDS A NEW TASK ITEM TO THE LIST
    let tasks = 0;
    //function addTask()
    $("#addTask").click(function(){
        $(".add-items").append('<div class="item"><input type="text" name="new-task" id="new-task' + tasks + '" class="new-task"><div class="x">&times;</div></div>');
        tasks++;
    });

    // GRAYS OUT THE TASK AND PUTS A SLASH THROUGH IT
    //$("span").click
    //function finishTask
    $(document).on("click", ".item-text", function(){
        if ($(this).hasClass("done-task")){
            $(this).toggleClass("undone-task");
        } else {
            $(this).toggleClass("done-task");
        }
        
    });

    // REMOVES LIST FROM CURRENT LISTS 
    $(document).on("click", ".removebtn", function(){
        $(this).parent().parent().remove();
    });


    // REMOVES AN THE ADDED TASK
    //function removeTask
    $(document).on("click", ".x", function(){
        $(this).parent().remove();
        
    });

    let tasks_id = 0;
    let tasks_count = 0;
    let task_value;

    // SUBMITS THE CREATED LIST TO CREATE AN INTERACTIVE LIST
    $("#finish").click(function(){
        // MAKES SURE THE LIST HAS TASKS BEFORE CREATING LIST
        if ($("#add-items").is(":parent") == false){
            alert("Please add tasks before creating a list.");
            return;
        }

        let fullDate = new Date();
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let stringDate = weekday[fullDate.getDay()] + ", " + month[fullDate.getMonth()] + " " + fullDate.getDate();
        let add_items = document.getElementById("add-items");
        let tasks = add_items.getElementsByClassName("item");

        $(".finished-container").append('<div class="finished-list"><div class="list-header"><h3 class="finished-title">' + document.getElementById("title").value +'</h3><span class="date-info">' + stringDate + '</span> </div> <div class="tasks" id="tasks' + tasks_id + '"></div> <div class="list-buttons"><button class="removebtn">Remove List</button></div></div>');

        for (i=0; i<tasks.length; i++){
            if ($(".item:nth-child(" + (i + 1) + ") > input").val()){
                task_value = $(".item:nth-child(" + (i + 1) + ") > input").val();

                $("#tasks" + tasks_count).append('<span class="item-text" >' + task_value + '</span>');
            };

        };
        tasks_count++;
        tasks_id++;
        document.getElementById("new-list").style.display = 'none';
        document.getElementById("newbtn").style.display = 'block';
        clearList();
    });
});