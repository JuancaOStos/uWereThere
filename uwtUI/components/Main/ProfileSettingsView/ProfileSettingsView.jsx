import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { AppContext } from "../../AppContext";

// TODO: añadir cambio de contraseña
// TODO: añadir cambio de avatar
// TODO: [añadir cambio de idioma]
// TODO: [añadir cambio de privacidad]
// TODO: estilar
// TODO: documentar
export default function ProfileSettingsView() {
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
            >
                <Text style={{ fontSize: 20 }}>Cambiar nickname</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.settingsButton}
            >
                <Text style={{ fontSize: 20 }}>Cambiar contraseña</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.settingsButton}
                >
                    <Text style={{ fontSize: 20 }}>Español</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.settingsButton}
                >
                    <Text style={{ fontSize: 20 }}>English</Text>
                </TouchableOpacity>

            </View>
            <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={handleIsVisible}
                >
                    <Text style={{ fontSize: 20 }}>Toggle modal</Text>
                </TouchableOpacity>
            <Modal
                animationType="slide"
                onRequestClose={handleIsVisible}
                presentationStyle="pageSheet"
                visible={isVisible}
            >
                <View style={{
                    borderWidth: 1,
                    height: '100%',
                    width: '100%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'lightgrey'
                }}>
                    <Text
                        style={{alignSelf: 'center' }}
                    >
                        Modal
                    </Text>
                    <TouchableOpacity
                        style={{ backgroundColor: 'lightblue', alignSelf: 'center', padding: 10 }}
                        onPress={() => {
                            alert('it works')
                            handleIsVisible()
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>Press me</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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