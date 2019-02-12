$(document).ready(function() {
    var socket = io();

    socket.on("sendToClient", function(data) {
        console.log(data);
        if (data.id) {
            console.log("vamos a darle estilitosssss");
            let estudianteActivo = document.getElementById(
                `estudiante-${data.id}`
            );
            estudianteActivo.classList.remove("badge-secondary");
            estudianteActivo.classList.add("badge-success");
        } else {
            console.log("error en la consulta socket");
        }
        scheduler.load("/data", "json");
        // $("#notificacionSocket").css('opacity', '1')

        // setTimeout(() => {
        //     $("#notificacionSocket").css('opacity', '0')
        // }, 5000)
    });
});
function init() {
    scheduler.config.multisection = true;

    //prueba opciones
    scheduler.config.drag_move = true;
    scheduler.config.drag_resize = false;

    scheduler.config.readonly = true;

    scheduler.config.first_hour = 6;
    scheduler.config.last_hour = 21;
    //

    scheduler.templates.event_class = function(start, end, event) {
        var original = scheduler.getEvent(event.id);
        if (!scheduler.isMultisectionEvent(original)) return "";
        return "multisection section_" + event.section_id;
    };

    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.locale.labels.unit_tab = "Unit";
    // scheduler.locale.labels.section_custom = "Section";

    var sections = [
        { key: 1, label: "Frankfurt" },
        { key: 2, label: "Bochum" },
        { key: 3, label: "Freiburg" },
        { key: 4, label: "Stuttgart" },
        { key: 5, label: "Salzburg" },
        { key: 6, label: "Zürich" },
        { key: 7, label: "Wien" },
        { key: 8, label: "München" },
        { key: 9, label: "Berlin" },
        { key: 10, label: "Köln" },
        { key: 11, label: "Dortmund" },
        { key: 12, label: "Lüneburg" },
        { key: 13, label: "Klassenzimmer-A" },
        { key: 14, label: "Klassenzimmer-B" }
    ];

    // scheduler.createTimelineView({
    // 	name: "timeline",
    // 	x_unit: "minute",
    // 	x_date: "%H:%i",
    // 	x_step: 8,
    // 	x_size: 33,
    // 	x_length:33,
    // 	event_dy:60,
    // 	resize_events:false,
    // 	y_unit: sections,
    // 	y_property: "section_id",
    //     render: "bar",
    //     scrollable: true,
    //     column_width: 70,
    // 	second_scale:{
    // 		x_unit: "day", // unit which should be used for second scale
    // 		x_date: "%F %d" // date format which should be used for second scale, "July 01"
    // 	}
    // });
    scheduler.date.timeline_start = scheduler.date.day_start;
    scheduler.createUnitsView({
        name: "unit",
        property: "section_id",
        list: sections,
        size: 5, // the number of units that should be shown in the view
        step: 5, // the number of units that will be scrolled at once
        skip_incorrect: true
    });

    //pruebas
    var dragged_event;
    scheduler.attachEvent("onBeforeDrag", function(id, mode, e) {
        // use it to get the object of the dragged event
        dragged_event = scheduler.getEvent(id);
        return true;
    });

    scheduler.attachEvent("onDragEnd", function(id, mode, e) {
        var event_obj = dragged_event;
        // your custom logic
    });

    scheduler.attachEvent("onBeforeEventChanged", function(
        ev,
        e,
        is_new,
        original
    ) {
        //any custom logic here
        // if (!confirm("Are you sure about this change?")) {
        //                  revertFunc();
        //              }
        return true;
    });

    //importante
    scheduler.templates.event_header = function(start, end, ev) {
        // console.log(ev)
        let header = `<div class="text-center">
                        ${scheduler.templates.event_date(
                            start
                        )}-${scheduler.templates.event_date(end)}
                        <span class='negrilla'>Curso:  ${ev.clase}</span>
                    </div>`;
        return header;
    };
    scheduler.attachEvent("onClick", function(id, e) {
        console.log(id);
        console.log(e);
        // return true;
    });

    scheduler.templates.event_text = function(start, end, event) {
        let estudiantes = `<div class="contenedor-estudiantes">`;
        for (var estudiante of event.estudiantes) {
            if(estudiante.asistencia) {
                estudiantes += `<span id="estudiante-${
                    estudiante.id
                }"class="animated fadeIn badge badge-success estudiante">${
                    estudiante.nombre
                }</span>`;
            } else {
                estudiantes += `<span id="estudiante-${
                    estudiante.id
                }"class="animated fadeIn badge badge-secondary estudiante">${
                    estudiante.nombre
                }</span>`;
            }
            // console.log(estudiante.nombre);
        }
        estudiantes += `</div>`;
        return estudiantes;
    };

    //

    //probar
    scheduler.templates.tooltip_text = function(start, end, event) {
        console.log(event);
        return "<b>Event:</b> " + event.text + "<br/><b>Start date:</b> ";
    };

    //quitar los iconos de la izquierda
    scheduler.config.icons_select = [];
    scheduler.config.select = false;

    //

    scheduler.config.lightbox.sections = [
        {
            name: "description",
            height: 130,
            map_to: "text",
            type: "textarea",
            focus: true
        },
        {
            name: "custom",
            height: 22,
            map_to: "section_id",
            type: "multiselect",
            options: sections,
            vertical: "false"
        },
        { name: "time", height: 72, type: "time", map_to: "auto" }
    ];

    scheduler.init("scheduler_here", new Date(), "unit");

    scheduler.load("/data", "json");
}
