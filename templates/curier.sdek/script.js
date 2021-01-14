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
// обработка поля страна
$(document).on("keyup","input.country",function(){
    if(this.value.length > 1){
        if(!inProcess){
            inProcess = true;
            $.ajax({
                url:BX.message('AJAX_URL'),
                type:"POST",
                dataType:'JSON',
                data:{
                    dadata:"Y",
                    getCountry:"Y",
                    query:this.value,
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
                }
            });
        }
    }
});

// обработка поля регион
$(document).on("keyup","input.region",function(){
    if(this.value.length > 1){
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
                    query:this.value,
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
                }
            });
        }
    }
});

// обработка поля город
$(document).on("keyup","input.city",function(){
    if(this.value.length > 1){
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
                    query:this.value,
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
                }
            });
        }
    }
});

// обработка поля улица, дом
$(document).on("keyup","input.house",function(){
    if(this.value.length > 1){
        if(!inProcess){
            inProcess = true;
            let dataCode = $("input.city").data('code');
            let dataCity = $("input.city").data('city');
            let dataSettlement = $("input.city").data('settlement');

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
                    query:this.value,
                    restriction:restriction
                },
                beforeSend:function(){

                },
                success:function(result){
                    let houses = "";
                    for(let key in result){
                        houses += "<div data-geolon='" + result[key]['geo_lon'] + "' data-geolat='" + result[key]['geo_lat'] + "' data-value='" + result[key]['value'] + "' class='address-item'>" + result[key]["street_with_type"] + " " + result[key]['house_type'] + " " + result[key]['house'] + "</div>";
                    }
                    $(".house-results").html(houses).fadeIn(50);
                    inProcess = false;
                }
            });
        }
    }
});

