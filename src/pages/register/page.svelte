<script lang="ts">
	import * as Auth from '$features/Auth';
	import { RegisterForm } from '$widgets/RegisterForm';

	let formState: Auth.RegisterForm = $state({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
	});
</script>

<RegisterForm bind:formState />
