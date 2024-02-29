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
		<span class="select__label">{{ props.text }}</span>
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
	padding: 0 2em 0 1em;
	border: 1px solid var(--gray-light);
	border-radius: 4px;
	font-size: 14px;
	font-weight: 500;
	color: var(--gray-dark);
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
	overflow: hidden;
}
/* Arrow */
.select::after {
	content: '\25BC';
	position: relative;
	top: 4px;
	right: 20px;
	transition: 0.25s all ease;
	pointer-events: none;
}
.select__label {
	line-height: 30px;
	font-weight: 500;
}
</style>
