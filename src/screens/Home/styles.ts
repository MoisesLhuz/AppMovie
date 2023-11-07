import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1e1e1e',      
    },

    noResult: {
        color: '#fff',
        fontSize: 18,
        textAlign: "center",
        marginVertical: 10,
    },

    flatList: {        
        alignItems: "center",
        justifyContent: "center",
    },

    header: {
        padding: 25,      
    },
    
    headerText: {
        marginTop: 30,
        fontSize: 24,
        lineHeight: 45,
        color: "#fff",
    },
    containerInput: {
        backgroundColor: "#67686d",
        height: 42,
        padding: 10,
        borderRadius: 16,
        marginTop: 24,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },

    input: {
        color: "#fff",
        width: "80%",
        paddingLeft: 15,
    },
  });
  