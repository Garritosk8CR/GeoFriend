<template>
    <v-layout align-center justify-center fill-height :style="headerStyle">
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Sign Up</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field prepend-icon="email" name="email" label="Email" v-model="email" :rules="emailRules" required></v-text-field>
                        <v-text-field prepend-icon="person" v-model="name" :rules="nameRules" label="Name" reqired></v-text-field>
                        <v-text-field prepend-icon="person_outline" v-model="alias" :rules="aliasRules" :error-messages="isShowFeedback" label="Alias" reqired></v-text-field>
                        <v-text-field :append-icon="isShowPassword" v-model="password" :rules="passwordRules" label="Password" required :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-chip v-if="authError" label outline color="red">{{authError}}</v-chip>

                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="submit">Sign Up</v-btn>
                </v-card-actions>

            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import db from '@/db'
import Slugify from 'slugify'
import {mapState, mapGetters} from 'vuex'
export default {
    data: () => ({
        drawer: null,
        valid: true,
        showPassword: false,
        slug: null,
        name: '',
        feedback: '',
        showFeedback: false,
        nameRules: [
            v => !!v || 'Name is required'
        ],
        alias: '',

        password: '',
        passwordRules: [
            v => !!v || 'Password is required'
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
    }),
    props: {
        source: String,
        image: {
            type: String,
            default: require('@/assets/img/b4.png')
        }
    },
    computed: {
        ...mapGetters(['authError']),
        aliasRules(){
            return [
                v => !!v || 'Alias is required',
                v => {
                    var message = this.feedback
                    if(message == '') {
                        return true
                    } else {
                        return false
                    }
                }
            ]
        },
        isShowFeedback() {
            if(this.showFeedback) {
                return 'This alias already exists'
            }
            return ''
        },
        headerStyle() {
            return {
                height: '100%',
                overflow: 'hidden',
                background: `url(${this.image}) no-repeat 0 0 fixed`,
                'background-size': 'cover',
                position: 'initial',
                width: '100%'
            }
        },
        isShowPassword() {
            return this.showPassword ? 'visibility_off' : 'visibility'
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.slug = Slugify(this.alias, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                });

                let ref = db.collection('Users').doc(this.slug)
                ref.get()
                    .then(doc => {
                        if (doc.exists) {
                            this.feedback = 'This alias already exists'
                            this.showFeedback = true
                        } else {
                            const formData = {
                                name: this.name,
                                alias: this.alias,
                                slug: this.slug,
                                email: this.email,
                                password: this.password
                            }
                            this.$store.dispatch('signup', formData)

                        }

                    })


            }
        },
        clear() {
            this.$refs.form.reset()
            if (this.$store.getters.isAuthenticated) {
                this.$router.push({
                    name: 'trainingdashboard'
                })
            }

        }
    },
    created() {

    }
}
</script>

<style scoped>
</style>
