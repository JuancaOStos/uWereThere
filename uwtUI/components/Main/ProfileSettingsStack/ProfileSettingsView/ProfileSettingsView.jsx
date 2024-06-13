import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import i18n, { resources } from "../../../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../../AppContext";

// TODO: añadir cambio de contraseña
// TODO: añadir cambio de avatar
// TODO: [añadir cambio de idioma]
// TODO: [añadir cambio de privacidad]
// TODO: estilar
// TODO: documentar
export default function ProfileSettingsView({ navigation }) {
    const { t } = useTranslation()
    const [isVisible, setIsVisible] = useState(false)
    const { handleAuth, url } = useContext(AppContext)

    const handleIsVisible = () => setIsVisible(!isVisible)

    return(
        <View style={{
            alignSelf: 'center',
            justifyContent: 'center',
            height: '100%',
        }}>
            <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate('ChangeNickname')}
            >
                <Text style={{ fontSize: 20 }}>{t('buttons.change_nickname')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate('ChangePassword')}
            >
                <Text style={{ fontSize: 20 }}>{t('buttons.change_password')}</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>{t('Languages')}</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => i18n.changeLanguage('es')}
                    style={styles.settingsButton}
                >
                    <Text style={{ fontSize: 20 }}>Español</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => i18n.changeLanguage('en')}
                    style={styles.settingsButton}
                >
                    <Text style={{ fontSize: 20 }}>English</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    settingsButton: {
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'lightgreen'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})