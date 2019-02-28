<template>
    <div>
        <v-navigation-drawer v-if="isAuthenticated" :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
            <v-list dense :style="{padding: '0px'}">
                <v-layout v-if="user" :key="user.alias"
                :style="userMenuStyle"
                row align-start justify-center fill-height>
                    <v-flex xs8 @click="goToProfile">
                        <br />
                        <h4 class="title" :style="{color: '#FAFAFA'}">
                            &nbsp; {{ user.alias }}
                        </h4>
                        <br />
                        <br />
                    </v-flex>
                </v-layout>
                <template v-for="item in items">
                    <v-layout v-if="item.heading" :key="item.heading" row align-center>
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>
                    <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :color="item.color"
                        :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title class="dark--text">
                                    <p class="black--text">{{ item.text }}</p>
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-for="(child, i) in item.children" :key="i" >
                            <v-list-tile-action v-if="child.icon">
                                <v-icon :color="child.color">{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="item.text" :to="{name: item.pathName}">
                        <v-list-tile-action>
                            <v-icon :color="item.color">{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                <p class="black--text">{{ item.text }}</p>
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
                <v-list-tile key="Log out" @click="onLogout">
                    <v-list-tile-action>
                        <v-icon color="red darken-3">exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            Log out
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon v-if="isAuthenticated" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">GEO FRIEND</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="!isAuthenticated" :to="{name: 'signup'}" flat>
                Sign up
            </v-btn>
            <v-btn v-if="!isAuthenticated" :to="{name: 'login'}" flat>
                Log in
            </v-btn>
        </v-toolbar>
    </div>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
    props: {
        source: String,
        image: {
            type: String,
            default: require('@/assets/img/usernameBackground.jpeg')
        }
    },
    data: () => ({
        dialog: false,
        drawer: null,
        isLoged: false,
        logedUser: null,
        items: [{
                icon: 'dashboard',
                text: 'Home',
                pathName: 'home',
                click: '',
                color: 'blue darken-3'
            },
            {
                icon: 'map',
                text: 'Gmap',
                pathName: 'gmap',
                click: '',
                color: 'green darken-3'
            },
            {
                icon: 'chat_bubble',
                text: 'Global Chat',
                click: '',
                pathName: 'gchat',
                color: 'amber darken-3'
            }
            // ,
            // {
            //     icon: 'keyboard_arrow_up',
            //     'icon-alt': 'keyboard_arrow_down',
            //     text: 'Labels',
            //     model: true,
            //     children: [{
            //         icon: 'add',
            //         text: 'Create label',
            //         color: 'blue darken-3'
            //     }],
            //     color: 'blue darken-3'
            // },
            // {
            //     icon: 'keyboard_arrow_up',
            //     'icon-alt': 'keyboard_arrow_down',
            //     text: 'More',
            //     model: false,
            //     children: [{
            //             text: 'Import'
            //         },
            //         {
            //             text: 'Export'
            //         },
            //         {
            //             text: 'Print'
            //         },
            //         {
            //             text: 'Undo changes'
            //         },
            //         {
            //             text: 'Other contacts'
            //         }
            //     ],
            //     color: 'blue darken-3'
            // },
            // {
            //     icon: 'settings',
            //     text: 'Settings',
            //     click: '',
            //     color: 'blue darken-3'
            // },
            // {
            //     icon: 'help',
            //     text: 'Help',
            //     color: 'blue darken-3'
            // },
            // {
            //     icon: 'phonelink',
            //     text: 'App downloads',
            //     click: '',
            //     color: 'blue darken-3'
            // },
            // {
            //     icon: 'keyboard',
            //     text: 'Go to the old version',
            //     click: '',
            //     color: 'blue darken-3'
            // }

        ]
    }),
    computed: {
        ...mapGetters([
            'isAuthenticated',
            'user',
            'getLogedUser',
            'getUserId'
        ]),
        isLogedIn() {
            this.isLoged = this.$store.getters.isAuthenticated
            if (this.isLoged) {
                if(!this.logedUser) {
                    this.logedUser = this.getLogedUser
                }
            }
            return this.isLoged
        },
        userMenuStyle() {
            return {
                overflow: 'hidden',
                'background': `url(${this.image})`,
                'background-size': 'cover'
            }
        }
    },
    methods: {
        ...mapActions([
            'logout',
            'getUserById'
        ]),
        ...mapMutations([
            'setUserToShow'
        ]),
        onLogout() {
            this.logedUser = null
            this.isLoged = false
            this.logout()
        },
        goToProfile() {
            this.getUserById(this.getLogedUser.id).then(user => {
                this.setUserToShow(user)
                this.$router.push({name: 'profile'})
            })
        }
    }
}
</script>
