#!groovy

pipeline {
    agent any

    options {
        buildDiscarder(logRotator(daysToKeepStr:'15'))
    }

    stages {
        stage('Configuration')
        {
            steps {
                ansiColor('xterm')
                {
                    sh "git config user.email \"jenkins@xephi.fr\" && git config user.name \"Jenkins\" && git config push.default simple"
                    script {
                        env.GIT_URL = sh(returnStdout: true, script: 'git config --get remote.origin.url').trim()
                    }
                    sh "npm install -g @angular/cli"
                }
            }
        }
        stage('Build') {
            steps {
                ansiColor('xterm') {
                    sh "npm install"
                    sh "ng build"
                }
            }
        }
    }

    post {
        always {
            deleteDir()
        }
    }
}
