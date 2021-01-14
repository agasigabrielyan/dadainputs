<? if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die(); ?>

        <div data-sid="COUNTRY" class="col-md-12 col-sm-12 col-xs-12 no-padding-on-mobile">
            <div class="form-group animated-labels">

                <div class="input input-with-margin-top input-with-margin-bottom">
                    <input  placeholder="Страна *" data-code="" autocomplete="off" type="text" id="POPUP_COUNTRY" name="COUNTRY" class="country form-control required field-to-be-fill" value="" aria-required="true" >
                    <div class="addresses-results country-results"></div>
                </div>

            </div>
        </div>
        <div data-sid="REGION" class="col-md-12 col-sm-12 col-xs-12 no-padding-on-mobile">
            <div class="form-group animated-labels">
                <div class="input input-with-margin-top input-with-margin-bottom">
                    <input placeholder="Регион *" data-code="" autocomplete="off" type="text" id="POPUP_REGION" name="REGION" class="region form-control required field-to-be-fill" value="" aria-required="true">
                    <div class="addresses-results region-results"></div>
                </div>
            </div>
        </div>
        <div data-sid="CITY" class="col-md-12 col-sm-12 col-xs-12 no-padding-on-mobile">
            <div class="form-group animated-labels">
                <div class="input input-with-margin-top input-with-margin-bottom">
                    <input placeholder="Город *" data-code="" autocomplete="off" type="text" id="POPUP_CITY" name="CITY" class="city form-control required field-to-be-fill" value="" aria-required="true">
                    <div class="addresses-results city-results"></div>
                </div>
            </div>
        </div>
        <div data-sid="HOUSE" class="col-md-12 col-sm-12 col-xs-12 no-padding-on-mobile">
            <div class="form-group animated-labels">
                <div class="input input-with-margin-top input-with-margin-bottom">
                    <input placeholder="Дом *" data-settlement="" data-city="" data-code="" autocomplete="off" type="text" id="POPUP_HOUSE" name="HOUSE" class="house form-control required field-to-be-fill" value="" aria-required="true">
                    <div class="addresses-results house-results"></div>
                </div>
            </div>
        </div>
<script>
    BX.message({
        AJAX_URL:"<?= $componentPath . '/ajax.php' ?>"
    });
</script>
