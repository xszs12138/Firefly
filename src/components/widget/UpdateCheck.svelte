<script lang="ts">
import { onDestroy, onMount } from "svelte";
import Icon from "@/components/common/Icon.svelte";
import I18nKey from "@/i18n/i18nKey";
import { i18n } from "@/i18n/translation";

interface Props {
	checkUpdatesInterval?: number;
	checkUpdateUrl?: string;
}

let {
	checkUpdatesInterval = 1,
	checkUpdateUrl = typeof import.meta.env !== "undefined" &&
	import.meta.env?.BASE_URL
		? import.meta.env.BASE_URL
		: "/",
}: Props = $props();

let isShow = $state(false);
let isCheckingUpdates = $state(false);
let currentVersionTag = $state("");
let lastVersionTag = $state("");
let timer: ReturnType<typeof setInterval> | null = null;

async function getVersionTag() {
	try {
		if (
			typeof location !== "undefined" &&
			(location.hostname === "localhost" || location.hostname === "127.0.0.1")
		) {
			return null;
		}
		const response = await fetch(checkUpdateUrl, {
			cache: "no-cache",
			method: "HEAD",
			redirect: "manual",
		});
		return (
			response.headers.get("etag") || response.headers.get("last-modified")
		);
	} catch {
		console.error("Failed to fetch version tag");
		return null;
	}
}

async function checkForUpdates() {
	const versionTag = await getVersionTag();
	if (!versionTag) return;

	if (!lastVersionTag) {
		lastVersionTag = versionTag;
		return;
	}

	if (lastVersionTag !== versionTag) {
		if (timer) clearInterval(timer);
		currentVersionTag = versionTag;
		isShow = true;
	}
}

function start() {
	if (checkUpdatesInterval <= 0) return;
	timer = setInterval(checkForUpdates, checkUpdatesInterval * 60 * 1000);
}

function stop() {
	if (timer) {
		clearInterval(timer);
		timer = null;
	}
}

function handleVisibilitychange() {
	if (document.hidden) {
		stop();
	} else {
		if (!isCheckingUpdates) {
			isCheckingUpdates = true;
			checkForUpdates().finally(() => {
				isCheckingUpdates = false;
				start();
			});
		}
	}
}

function onConfirm() {
	lastVersionTag = currentVersionTag;
	window.location.reload();
}

onMount(() => {
	// 开发测试：访问 ?test-update=1 可强制显示弹窗
	if (
		typeof location !== "undefined" &&
		(location.hostname === "localhost" || location.hostname === "127.0.0.1") &&
		new URLSearchParams(location.search).get("test-update") === "1"
	) {
		isShow = true;
		return;
	}
	start();
	if (typeof document !== "undefined") {
		document.addEventListener("visibilitychange", handleVisibilitychange);
	}
});

onDestroy(() => {
	stop();
	if (typeof document !== "undefined") {
		document.removeEventListener("visibilitychange", handleVisibilitychange);
	}
});
</script>

{#if isShow}
	<!-- 遮罩层 -->
	<div
		class="update-check-overlay fixed inset-0 z-[9998] bg-neutral-900/50 backdrop-blur-sm"
		aria-hidden="true"
	></div>

	<!-- 弹窗 -->
	<div
		role="dialog"
		aria-modal="true"
		aria-labelledby="update-check-title"
		aria-describedby="update-check-desc"
		class="update-check-dialog fixed left-1/2 top-1/2 z-[9999] w-[min(90vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
	>
		<div class="flex items-start gap-4">
			<div
				class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--primary)/10 text-(--primary)"
			>
				<Icon icon="material-symbols:system-update" class="text-2xl" />
			</div>

			<div class="min-w-0 flex-1">
				<h2
					id="update-check-title"
					class="text-lg font-semibold text-neutral-900 dark:text-neutral-100"
				>
					{i18n(I18nKey.updateAvailable)}
				</h2>
				<p
					id="update-check-desc"
					class="mt-1 text-sm text-neutral-600 dark:text-neutral-400"
				>
					{i18n(I18nKey.updateAvailableDesc)}
				</p>

				<button
					type="button"
					onclick={onConfirm}
					class="btn-regular mt-4 w-full cursor-pointer rounded-lg bg-(--primary) px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--primary) focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
				>
					{i18n(I18nKey.updateRefresh)}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.update-check-overlay {
		animation: update-fade-in 0.2s ease-out;
	}
	.update-check-dialog {
		animation: update-scale-in 0.25s ease-out;
	}
	@keyframes update-fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes update-scale-in {
		from {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.96);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.update-check-overlay,
		.update-check-dialog {
			animation: none;
		}
	}
</style>
