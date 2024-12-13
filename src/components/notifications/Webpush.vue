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
        // window.addEventListener('load', () => {
        //     console.log("LOADED");
        // }),
        async registerWebpush() {


            console.log("PRESSED");
            const publicVapidKey = "BOd2EQ8LTe3KAgMX9lWwTlHTRzv1Iantw50Mw6pUnsNr3pcxl8iglUs-YlQEQLo4UbJk9oyXs_BxgyAe0TCqKME";
            
            // Notification.requestPermission();

            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                    navigator.serviceWorker.ready.then((registration) => {
                        registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: publicVapidKey })
                            .then((subscription) => {
                                console.log('Subscribed for push:', subscription.endpoint);
                                console.log('Subscribed for push:', subscription);
                                this.$parent.notification.sub = subscription; // `this` now works as expected
                            })
                            .catch((error) => {
                                console.log('Subscription failed:', error);
                            });
                    });
                } else {
                    console.log('Unable to get permission to notify.');
                }
            });

            // if ('serviceWorker' in navigator) {
            //     console.log("HERE!");

            //     const register = navigator.serviceWorker.getRegistration();
            //     const subscription = await register.pushManager.subscribe({
            //         userVisibleOnly: true,
            //         applicationServerKey: publicVapidKey,
            //     });
            //     this.$parent.notification.sub = subscription;
            //     // void (await navigator.serviceWorker.ready).dispatchEvent({
            //     //     const subscription = await register.pushManager.subscribe({
            //     //         userVisibleOnly: true,
            //     //         applicationServerKey: publicVapidKey,
            //     //     });

            //     //     this.$parent.notification.sub = subscription;
            //     // });

            // } else {
            //     console.log("browser doesnt support notification");
            // }

            // const register = await navigator.serviceWorker.register('../public/serviceWorker.ts', {
            //     scope: '/'
            // });

            // const subscription = await register.pushManager.subscribe({
            //     userVisibleOnly: true,
            //     applicationServerKey: publicVapidKey,
            // });

            // this.$parent.notification.sub = subscription;

        }
    },
};
</script>