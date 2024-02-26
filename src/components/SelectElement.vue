<script setup>

const props = defineProps({
	options: {
		type: Array,
	},
	text: {
		type: String,
	},
	selected: {
		type: String,
	}
})

const emit = defineEmits(['changeValue'])

const changeValue = (e) => {
	emit('changeValue', e.target.value)
}
</script>

<template>
	<div class="select">
		<span class="select__label">{{ props.text }}:</span>
		<select @change="changeValue($event)">
			<option
				v-for="option in props.options"
				:value="option.value"
				:key="option.index"
				:selected="option.value === props.selected"
				:disabled="option.disabled"
			>
				{{ option.text }}
			</option>
		</select>
	</div>
</template>

<style scoped>
select {
	/* Reset Select */
	appearance: none;
	outline: 0;
	border: 0;
	box-shadow: none;
	/* Personalize */
	flex: 1;
	padding: 0 2em 0 1em;
	color: #212529;
	font-size: 18px;
	border: 1.2px solid #ced4da;
	cursor: pointer;
}
/* Remove IE arrow */
select::-ms-expand {
	display: none;
}
/* Custom Select wrapper */
.select {
	position: relative;
	display: flex;
	width: 20em;
	height: 3em;
	padding: 1px;
	overflow: hidden;
	border-radius: 0.25em;

}
/* Arrow */
.select::after {
	content: '\25BC';
	position: absolute;
	top: 0;
	right: 0;
	padding: 1em;
	transition: 0.25s all ease;
	pointer-events: none;
}
.select__label {
	margin-right: 20px;
	line-height: 48px;
	min-width: 70px;
	text-align: right;
}
</style>