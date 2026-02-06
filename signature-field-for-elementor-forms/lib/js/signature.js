(function ($) {
	"use strict";
	jQuery(document).ready(function ($) {
		setTimeout(function () {
			$(".elementor").not(".elementor-location-popup").each(function (e) {
				$(".elementor-signature-field", $(this)).each(function (index) {
					elementor_signature_field($(this));
				});
			})
		}, 200);
		$(document).on('click change',
			'.e-form__buttons__wrapper button, .elementor-tab-title',
			function () {
				setTimeout(function () {
					$(".elementor-signature-field:visible").each(function () {
						elementor_signature_field($(this));
					});
				}, 50);
			}
		);
		jQuery(document).on('elementor/popup/show', () => {
			$(".elementor-signature-field:visible").each(function () {
				elementor_signature_field($(this));
			});
		});
		function elementor_signature_field(field) {
			if (!field.is(':visible')) {
				return;
			}
			var form = field.closest("form");
			if (!form.length || !form.is(':visible')) {
				return;
			}
			// Prevent double initialization
			if (field.data('signature-initialized')) {
				return;
			}
			field.data('signature-initialized', true);
			$(".elementor-upload-field-signature").attr("type", "hidden");
			var form = field.closest("form");
			var data_id = field.data("id");
			var background = field.data("background");
			var color = field.data("color");
			var data = $(".elementor-upload-field-signature-" + data_id, form).val();
			var name = field.data("name");
			if (name == 1) {
				name = true;
			} else {
				name = false;
			}
			field.signature({
				color: color,
				background: background,
				guideline: name,
				syncFormat: "PNG",
				syncField: $(".elementor-upload-field-signature-" + data_id, form),
				name: name,
				change: function () {
				}
			});
			if (data != "") {
				field.signature('draw', data);
				$(".elementor-upload-field-signature-" + data_id, form).val(data);
			} else {
				$(".elementor-upload-field-signature-" + data_id, form).val("");
			}
		}
		$("body").on("click", ".elementor-field-type-submit", function () {
			var form = $(this).closest("form");
			if ($(".elementor-upload-field-signature", form).length > 0) {
				var required = $(".elementor-upload-field-signature", form).attr("required");
				var check = $(".elementor-upload-field-signature", form).val();
				if (required == "required" && check == "") {
					$(".elementor-upload-field-signature", form).attr("type", "hidden");
				}
			}
		})
		$("body").on("click", ".elementor_signature_clear img", function () {
			$(this).closest(".elementor-field-type-signature").find(".elementor-signature-field").signature('clear');
			$(this).closest(".elementor-field-type-signature").find("input").val("").attr("value", "");
		})
		$("body").on("input", ".elementor_signature_name", function () {
			var name = $(this).val();
			$(this)
				.closest(".elementor-field-type-signature")
				.find(".elementor-signature-field")
				.signature('setname', name);
		});
		$(document).on('reset', function (event) {
			$(".elementor_signature_clear").each(function (index) {
				$(this).find("img").click();
			});
		});
	})
})(jQuery);