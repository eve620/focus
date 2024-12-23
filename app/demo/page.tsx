'use client'
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import React, {useState} from "react";

export default function Notice() {

    interface Character {
        id: string;
        name: string;
        role: string;
        description: string;
        imageUrl: string;
        abilities: string[];
    }

    const characters: Character[] = [
        {
            id: '1',
            name: '艾丽斯',
            role: '黑客',
            description: '艾丽斯是一位天才黑客，能够轻松入侵任何电子系统。她的技能在信息战中发挥着关键作用。',
            imageUrl: '/placeholder.svg',
            abilities: ['系统入侵', '数据分析', '电子干扰']
        },
        {
            id: '2',
            name: '杰克',
            role: '战士',
            description: '杰克是一名经验丰富的前特种部队成员，擅长各种武器和近身格斗。他是团队中的主要输出力量。',
            imageUrl: '/placeholder.svg',
            abilities: ['精准射击', '格斗技巧', '战术分析']
        },
        {
            id: '3',
            name: '莉莉',
            role: '医疗师',
            description: '莉莉是一位天才生物工程师，专门研究人体增强技术。她的医疗技能对团队至关重要。',
            imageUrl: '/placeholder.svg',
            abilities: ['快速治疗', '生物强化', '毒素研究']
        }
    ]

    const [selectedCharacter, setSelectedCharacter] = useState<Character>(characters[0])

    return (
        <div className="container px-4 py-8  mx-auto">
            <h1 className="text-3xl font-bold mb-8">DEMO</h1>
            <h1 className="text-3xl font-bold mb-8">角色</h1>
            <Tabs defaultValue={characters[0].id} orientation="vertical"
                  onValueChange={(value) => setSelectedCharacter(characters.find(c => c.id === value) || characters[0])}>
                <TabsList className="w-full mb-4">
                    {characters.map((character) => (
                        <TabsTrigger key={character.id} value={character.id} className="w-full">
                            {character.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            <Card>
                <CardHeader>
                    <CardTitle>{selectedCharacter.name} - {selectedCharacter.role}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                        <Image
                            src={selectedCharacter.imageUrl}
                            alt={selectedCharacter.name}
                            width={300}
                            height={400}
                            className="rounded-md"
                        />
                        <div className="space-y-4">
                            <p>{selectedCharacter.description}</p>
                            <div>
                                <h3 className="font-semibold mb-2">技能：</h3>
                                <ul className="list-disc list-inside">
                                    {selectedCharacter.abilities.map((ability, index) => (
                                        <li key={index}>{ability}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">角色画廊</h2>
                <Carousel className="w-full max-w-xs mx-auto">
                    <CarouselContent>
                        {Array.from({length: 5}).map((_, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className="text-4xl font-semibold">{index + 1}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </div>
        </div>
    )
}

