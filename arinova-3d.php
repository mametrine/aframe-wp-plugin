<?php
/*
Plugin Name: Arinova 3D
Description: Interactive 3D model viewer.
Author: Arinova Ltd
Version: 1.0.0
*/

function arinova3d_enqueue_assets()
{
    wp_register_style(
        "arinova3d-styles",
        plugins_url("css/arinova-3d.css", __FILE__)
    );

    wp_enqueue_style("arinova3d-styles");

    wp_enqueue_script(
        "aframe",
        plugins_url("assets/js/aframe.min.js", __FILE__)
    );

    wp_enqueue_script(
        "arinova3d-gesture-overlay",
        plugins_url("assets/js/gesture-overlay.js", __FILE__),
        ["aframe"]
    );

    wp_enqueue_script(
        "arinova3d-look-controls",
        plugins_url("assets/js/look-controls-model.js", __FILE__),
        ["aframe"]
    );

    wp_enqueue_script(
        "arinova3d-model-changer",
        plugins_url("assets/js/model-changer.js", __FILE__),
        ["aframe"]
    );

    wp_enqueue_script(
        "arinova3d-select-menu",
        plugins_url("assets/js/select-menu.js", __FILE__),
        [],
        ""
    );
}

add_action("wp_enqueue_scripts", "arinova3d_enqueue_assets");

function arinova3d_shortcode()
{
    ob_start();
    require plugin_dir_path(__FILE__) . "templates/aframe-scene.php";
    return ob_get_clean();
}

add_shortcode("arinova3d", "arinova3d_shortcode");
