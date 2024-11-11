<script>
import { ButtonSecondary } from '$components/shared/buttons';
import { Avatar, Card } from '$components/shared/other';
import { Text, TextBase, TextLarge, TextSmall } from '$components/shared/text';
</script>

<section class="wrapper m-auto flex h-full max-h-[100rem] max-w-[100rem] flex-col gap-4">
	<div class="flex items-center justify-between">
		<div class="flex flex-col">
			<TextLarge>Hi, Emma</TextLarge>
			<TextBase className="text-light-text-muted font-normal">Good morning!</TextBase>
		</div>
		<Avatar src="/images/avatar.png"></Avatar>
	</div>
	<div class="grid h-full w-full grid-cols-2 gap-4 rounded-lg">
		<Card className="relative p-4 col-span-2">
			<div class="z-10 flex flex-col items-start justify-center gap-4">
				<div class="flex flex-col items-start gap-0.5">
					<Text
						className="inline-block rotate-180"
						props={{ family: 'palanquin', size: 'xl', weight: 'bold' }}>"</Text
					>
					<TextBase>Got questions?</TextBase>
					<TextBase>Purr-haps I can help!</TextBase>
				</div>
				<ButtonSecondary href="chat">
					<TextSmall>Start a Chat</TextSmall>
				</ButtonSecondary>
			</div>
			<img
				class="absolute bottom-0 right-4 h-full pt-[2.5%] xs:mix-blend-luminosity"
				src="/images/icat.png"
				alt="iCat"
			/>
		</Card>
		<Card
			className="flex-col justify-center items-center gap-2 p-14"
			props={{ color: 'primary' }}
			href="chat"
		>
			<img class="h-12" src="/images/chat.png" alt="chat" />
			<TextBase>Chat</TextBase>
		</Card>
		<Card
			className="flex-col justify-center items-center gap-2 p-14"
			props={{ color: 'secondary' }}
		>
			<img class="h-12" src="/images/scan.png" alt="chat" />
			<TextBase>Scan</TextBase>
		</Card>
		<Card
			className="relative flex-col justify-center items-center gap-2 p-14"
			props={{ color: 'accent' }}
		>
			<img class="absolute mb-7 h-16 w-[4.5rem]" src="/images/cosmetics.png" alt="chat" />
			<div class="h-12"></div>
			<TextBase>Cosmetics</TextBase>
		</Card>
		<Card
			className="flex-col justify-center items-center gap-2 p-14"
			props={{ color: 'background' }}
		>
			<img class="h-12" src="/images/settings.png" alt="chat" />
			<TextBase>Settings</TextBase>
		</Card>
	</div>
</section>
