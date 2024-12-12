<template>

    <button type="button" class="btn btn-primary" :disabled="processing" @click="registerWebpush">
        {{ $t("Allow Notifications") }}
    </button>
    
    <div class="mb-3">
        <!-- <label for="twilio-to-number" class="form-label">{{ $t("To Number") }}</label> -->
        <input id="sub" v-model="$parent.notification.sub" type="text" class="form-control" required>
    </div>

    <div class="mb-3 form-text">
        <a href="https://pumble.com/help/integrations/add-pumble-apps/incoming-webhooks-for-pumble/" target="_blank">{{ $t("documentationOf", ["Pumble Webbhook"]) }}</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            subs: '',
        }
    },
    methods: {
        async registerWebpush() {
            console.log("PRESSED");
            const publicVapidKey = "BOd2EQ8LTe3KAgMX9lWwTlHTRzv1Iantw50Mw6pUnsNr3pcxl8iglUs-YlQEQLo4UbJk9oyXs_BxgyAe0TCqKME";
            
            const register = await navigator.serviceWorker.register('./../worker.js', {
                scope: '/'
            });

            const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: publicVapidKey,
            });

            this.$parent.notification.sub = subscription;

        }
    },
};
</script>