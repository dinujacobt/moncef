/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    // focus to search on page load
    $('.search_div .search').focus();


    $('#filter_form :input').change(function () {
        custom_filtered_products();
    });

    //custom place holder for search
    $("span.custom_holder + input").keyup(function () {
        if ($(this).val().length) {
            $(this).prev('span.custom_holder').hide();
        } else {
            $(this).prev('span.custom_holder').show();
        }
    });
    $("span.custom_holder").click(function () {
        $(this).next().focus();
    });


    //margin bottom set to zero for opened accordion
    $('.filter_heading').click(function () {
        if ($(this).hasClass('collapsed')) {
            $(this).parent(".custom_panel").css('margin-bottom', '0px');
        } else {
            $(this).parent(".custom_panel").css('margin-bottom', '36px');
        }
    });


    //make jquery contain case insensitive
    // New selector
    jQuery.expr[':'].Contains = function (a, i, m) {
        return jQuery(a).text().toUpperCase()
                .indexOf(m[3].toUpperCase()) >= 0;
    };
    // Overwrites old selecor
    jQuery.expr[':'].contains = function (a, i, m) {
        return jQuery(a).text().toUpperCase()
                .indexOf(m[3].toUpperCase()) >= 0;
    };


    // search in country 
    $('#search_country').keyup(function () {
        var search = $(this).val();
        $('.country_list_search .item').hide();
        $('.country_list_search .item:contains("' + search + '")').show();
    });


    //mark country selecttion
    $('.country_search .country_list_search .item').click(function () {
        //enable below code if only one country should be selected
        //$('.country_search .country_list_search .item').not(this).removeClass('selected');
        $(this).toggleClass('selected');
        var country = $(this).children('p').text();
        var input_text = $('#user_selected_country').val();
        if ($(this).hasClass('selected')) {

            if (input_text == "") {
                //first country
                $('#user_selected_country').val(country);
                custom_filtered_products();
            } else {
                //multiple countries
                $('#user_selected_country').val($('#user_selected_country').val() + "," + country);
                custom_filtered_products();
            }
        } else {
            //remove country
            if (input_text == country) {
                $('#user_selected_country').val('');
            } else {
                var occurance = input_text.indexOf(country);
                if (occurance == 0) {
                    $('#user_selected_country').val(input_text.replace(country + ",", ""));
                    custom_filtered_products();
                } else {
                    $('#user_selected_country').val(input_text.replace("," + country, ""));
                    custom_filtered_products();
                }

            }
        }
    });


    function custom_filtered_products() {
        //finction to ajax submit form and refresh products
//        $.ajax({
//            url: "demo_test.php",
//            method: "post",
//            dataType: 'json',
//            data: {'form_s' : $('#filter_form').serializeArray()},
//            success: function (result) {
//                $("#div1").html(result);
//            }});
    }
    
    
     $('.color_picker .item .flip').click(function(){
        $(this).find('.card').toggleClass('flipped');        
    });
});