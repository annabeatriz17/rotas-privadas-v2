import React, { useState } from "react";

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "expo-router";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            const result = await signIn(email, password);

            if (!result.success) {
                Alert.alert('Erro', result.message || 'Falha no login. Tente novamente.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro durante o login. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                <Text style={styles.emoji}>🔐</Text>
                <Text style={styles.title}>Bem-vindo de volta!</Text>
                <Text style={styles.subtitle}>Faça login para continuar</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                />

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Entrar</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Não tem uma conta?</Text>
                    <Link href="/(auth)/register" asChild>
                        <TouchableOpacity disabled={loading}>
                            <Text style={styles.registerLink}> Registre-se</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
                
                <Text style={styles.infoText}>
                    💡 Dica: Se não tiver conta, crie uma nova!
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    emoji: {
        fontSize: 60,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
        minHeight: 50,
        justifyContent: 'center',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',
    },
    registerText: {
        fontSize: 16,
        color: '#666',
    },
    registerLink: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    infoText: {
        marginTop: 30,
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
        paddingHorizontal: 20,
    },
});