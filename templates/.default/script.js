// при нажатии на элемент списка выбирается этот элемент в input
$(document).on("click",".address-item",function(){
    let dataCode = $(this).data('code');
    let dataCity = $(this).data('city');
    let dataSettlement = $(this).data('settlement');

    let fieldToBeField = $(this).parent().parent().find(".field-to-be-fill");

    $(fieldToBeField).val($(this).text());
    $(fieldToBeField).data("code",dataCode);
    $(fieldToBeField).data("city",dataCity);
    $(fieldToBeField).data("settlement",dataSettlement);

    $(".addresses-results").fadeOut(50);
});

let inProcess = false;
let typingTymer;

// обработка поля страна
$(document).on("keyup","input.country",function(){
    BX.closeWait();
    clearTimeout(typingTymer);
    typingTymer = setTimeout(getCountry,500);
});

// обработка поля регион
$(document).on("keyup","input.region",function(){
    BX.closeWait();
    clearTimeout(typingTymer);
    typingTymer = setTimeout(getRegion,500);
});

// обработка поля город
$(document).on("keyup","input.city",function(){
    BX.closeWait();
    clearTimeout(typingTymer);
    typingTymer = setTimeout(getCity,500);
});

// обработка поля улица, дом
$(document).on("keyup","input.house",function(){
    clearTimeout(typingTymer);
    typingTymer = setTimeout(getHouse,500);
});
$(document).on("keydown","input.field-to-be-fill",function(){
    clearTimeout(typingTymer);
});


$(document).on("click",function(){
    $(".addresses-results").html("").fadeOut(50);
});





function getCountry(){
    BX.showWait();
    if(!inProcess){
        inProcess = true;
        $.ajax({
            url:BX.message('AJAX_URL'),
            type:"POST",
            dataType:'JSON',
            data:{
                dadata:"Y",
                getCountry:"Y",
                query:$("input.country").val(),
            },
            beforeSend:function(){

            },
            success:function(result){
                let countryResults = "";
                for(let key in result){
                    countryResults += "<div class='address-item' data-code='" + key + "'>" + result[key] + "</div>";
                }
                $(".country-results").html(countryResults).fadeIn(50);
                inProcess = false;
                BX.closeWait();
            }
        });
    }
}
function getRegion(){
    BX.showWait();
    if(!inProcess){
        inProcess = true;
        let restriction = $("input.country").val();
        $.ajax({
            url:BX.message('AJAX_URL'),
            type:"POST",
            dataType:"JSON",
            data:{
                dadata:"Y",
                getRegion:"Y",
                query:$("input.region").val(),
                restriction:restriction
            },
            beforeSend:function(){

            },
            success:function(result){
                let regionResults = "";
                for(let key in result){
                    regionResults += "<div class='address-item' data-code='" + key + "'>" + result[key] + "</div>";
                }
                $(".region-results").html(regionResults).fadeIn(50);
                inProcess = false;
                BX.closeWait();
            }
        });
    }
}
function getCity(){
    BX.showWait();
    if(!inProcess){
        inProcess = true;
        let restriction = $("input.region").data('code');
        $.ajax({
            url:BX.message("AJAX_URL"),
            type:"POST",
            dataType:"JSON",
            data:{
                dadata:"Y",
                getCity:"Y",
                query:$("input.city").val(),
                restriction:restriction
            },
            beforeSend:function(){

            },
            success:function(result){
                let cityResults = "";
                for(let key in result){
                    cityResults += "<div class='address-item' data-settlement='" + result[key][1] + "' data-city='" + result[key][0] + "' data-code='" + key + "'>" + result[key][2] + "</div>";
                }
                $(".city-results").html(cityResults).fadeIn(50);
                inProcess = false;
                BX.closeWait();
            }
        });
    }
}
function getHouse() {
    BX.showWait();
    if(!inProcess){
        let dataCode = $("input.city").data('code');
        let dataCity = $("input.city").data('city');
        let dataSettlement = $("input.city").data('settlement');
        let valueOfCurrentField = $("input.house").val();

        let restriction = {
            dataCity:dataCity,
            dataSettlement:dataSettlement
        };

        $.ajax({
            url:BX.message("AJAX_URL"),
            type:"POST",
            dataType:"JSON",
            data:{
                dadata:"Y",
                getHouse:"Y",
                query:valueOfCurrentField,
                restriction:restriction
            },
            beforeSend:function(){

            },
            success:function(result){
                let houses = "";
                for(let key in result){
                    houses += "<div data-zip='" + result[key]['postal_code'] + "' data-geolon='" + result[key]['geo_lon'] + "' data-geolat='" + result[key]['geo_lat'] + "' data-value='" + result[key]['value'] + "' class='address-item'>" + result[key]['value'] + "</div>";
                }
                $(".house-results").html(houses).fadeIn(50);
                inProcess = false;
                BX.closeWait();
            }
        });
    }
}

