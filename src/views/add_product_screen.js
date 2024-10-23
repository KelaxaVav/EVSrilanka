import React, { useState } from 'react'
import { Button, ButtonText, Center, Input, InputField, SafeAreaView, Text, Textarea, TextareaInput, View } from '@gluestack-ui/themed'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddProductScreen() {
    const [text, setText] = useState('');
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ top: hp(1) }} >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <View style={{ paddingLeft: wp(5), paddingRight: wp(5), top: hp(4) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                            padding: wp(2),
                            borderRadius: 50,
                            backgroundColor: '#dae1e5',
                            justifyContent: 'center',
                            alignItems: 'center',
                            aspectRatio: 1
                        }}>
                            <FontAwesomeIcon icon={faChevronLeft} color="#000" size={wp(5)} />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#000', fontSize: wp(5), textAlign: 'center' }}>About</Text>
                        </View>

                        <View style={{
                            padding: wp(4),
                            borderRadius: 50,
                            aspectRatio: 1,
                        }} />
                    </View>

                    <View style={{ marginTop: hp(5) }}>
                        <Input
                            variant="outline"
                            size="md"
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}
                        >
                            <InputField
                                placeholder="Name"
                                type="text"
                                color="#000"
                                placeholderTextColor="#888"
                                padding={10}
                                backgroundColor="#dae1e5"
                                borderColor="transparent"
                                borderWidth={0}
                                borderRadius={10}
                                height={hp(7)}
                            />
                        </Input>

                        <View style={{ marginTop: hp(5) }}>
                            <View style={{ position: 'relative' }}>
                                <Textarea>
                                    <TextareaInput
                                        placeholder="Description"
                                        placeholderTextColor="#888"
                                        value={text}
                                        onChangeText={(value) => setText(value)}
                                        height={hp(15)}
                                        backgroundColor="#dae1e5"
                                        borderColor="transparent"
                                        borderWidth={0}
                                        borderRadius={10}
                                        padding={10}
                                        paddingTop={15}
                                        style={{ textAlignVertical: 'top' }}
                                    />
                                </Textarea>
                                <Text style={{ position: 'absolute', bottom: hp(2), right: wp(5), color: "#888", fontSize: wp(3) }}>
                                    {text.length} / 2000
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginTop: hp(5) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: wp(25) }}>
                                    <Text style={{ color: '#000', fontSize: wp(5), fontWeight: '500' }}>Cover photos</Text>
                                </View>
                                <View>
                                    <Text style={{ color: '#888', fontSize: wp(4) }}>(Upload up to 5 photos)</Text>
                                </View>
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: hp(2), paddingVertical: hp(1) }}
                            >
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <View key={index} style={{ width: wp(20), height: wp(20), backgroundColor: '#dae1e5', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: wp(2) }}>
                                        <FontAwesomeIcon icon={faAdd} color="#68a2e3" size={24} />
                                    </View>
                                ))}
                            </ScrollView>
                        </View>

                        <View style={{ marginTop: hp(5) }}>
                            <Text style={{ color: '#000', fontSize: wp(5), fontWeight: '500' }}>Price</Text>
                            <Input
                                variant="outline"
                                size="md"
                                isDisabled={false}
                                isInvalid={false}
                                isReadOnly={false}
                                style={{ marginTop: hp(2) }}
                            >
                                <InputField
                                    placeholder="$0.00"
                                    type="text"
                                    color="#000"
                                    placeholderTextColor="#888"
                                    padding={10}
                                    backgroundColor="#dae1e5"
                                    borderColor="transparent"
                                    borderWidth={0}
                                    borderRadius={10}
                                    height={hp(7)}
                                />
                            </Input>
                        </View>
                        <View style={{ marginTop: hp(5) }}>
                            <Button
                                onPress={() => navigation.navigate('AddProductSecond')}
                                style={{
                                    backgroundColor: '#68a2e3',
                                    marginTop: 20,
                                    padding: hp(2),
                                    borderRadius: wp(2),
                                    height: hp(8),
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <ButtonText style={{ textAlign: 'center', fontSize: wp(5), color: '#fff' }}>Next</ButtonText>
                            </Button>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}