<script lang="ts">
  import { WALLPAPER_BANNER, WALLPAPER_NONE, WALLPAPER_OVERLAY } from '@constants/constants'
  import I18nKey from '@i18n/i18nKey'
  import { i18n } from '@i18n/translation'
  import {
    getDefaultBannerTitleEnabled,
    getDefaultHue,
    getDefaultSakuraShow,
    getDefaultWavesEnabled,
    getHue,
    getStoredBannerTitleEnabled,
    getStoredSakuraShow,
    getStoredWallpaperMode,
    getStoredWavesEnabled,
    setBannerTitleEnabled,
    setHue,
    setSakuraShow,
    setWallpaperMode,
    setWavesEnabled,
  } from '@utils/setting-utils'
  import { onMount } from 'svelte'
  import Icon from '@/components/common/Icon.svelte'
  import { backgroundWallpaper, sakuraConfig, siteConfig } from '@/config'
  import type { WALLPAPER_MODE } from '@/types/config'

  let hue = $state(getHue())
  const defaultHue = getDefaultHue()
  let wallpaperMode: WALLPAPER_MODE = $state(backgroundWallpaper.mode)
  const defaultWallpaperMode = backgroundWallpaper.mode
  let currentLayout: 'list' | 'grid' = $state('list')
  const defaultLayout = siteConfig.postListLayout.defaultMode
  let mounted = $state(false)
  let isSmallScreen = $state(typeof window !== 'undefined' ? window.innerWidth < 1200 : false)
  let isSwitching = $state(false)
  let wavesEnabled = $state(true)
  const defaultWavesEnabled = getDefaultWavesEnabled()
  let bannerTitleEnabled = $state(true)
  const defaultBannerTitleEnabled = getDefaultBannerTitleEnabled()
  let sakuraShowEnabled = $state(getDefaultSakuraShow())
  const defaultSakuraShowEnabled = getDefaultSakuraShow()
  const isWallpaperSwitchable = backgroundWallpaper.switchable ?? true
  const allowLayoutSwitch = siteConfig.postListLayout.allowSwitch
  const showThemeColor = !siteConfig.themeColor.fixed
  // 是否允许用户切换水波纹动画（只看 switchable 配置）
  const isWavesSwitchable = backgroundWallpaper.banner?.waves?.switchable ?? false
  // 检查是否启用横幅标题配置
  const isBannerTitleEnabled = backgroundWallpaper.banner?.homeText?.enable ?? false
  // 是否允许用户切换横幅标题
  const isBannerTitleSwitchable = isBannerTitleEnabled && (backgroundWallpaper.banner?.homeText?.switchable ?? false)
  // 樱花特效设置
  const isSakuraSwitchable = sakuraConfig.enable ?? false //这个是系统层面控制是否要启用

  // 是否有任何横幅设置可显示（后续添加新设置时在此处添加条件）
  const hasBannerSettings = isWavesSwitchable || isBannerTitleSwitchable
  // 是否有特效设置可显示（樱花等）
  const hasEffectSettings = isSakuraSwitchable
  const hasAnyContent = showThemeColor || isWallpaperSwitchable || allowLayoutSwitch || hasBannerSettings || hasEffectSettings

  function resetHue() {
    hue = getDefaultHue()
  }

  function resetWallpaperMode() {
    wallpaperMode = defaultWallpaperMode
    setWallpaperMode(defaultWallpaperMode)
  }

  function resetLayout() {
    currentLayout = defaultLayout
    localStorage.setItem('postListLayout', defaultLayout)

    // 触发自定义事件，通知页面布局已改变
    const event = new CustomEvent('layoutChange', {
      detail: { layout: defaultLayout },
    })
    window.dispatchEvent(event)
  }

  function resetWavesEnabled() {
    wavesEnabled = defaultWavesEnabled
    setWavesEnabled(defaultWavesEnabled)
  }

  function toggleWavesEnabled() {
    wavesEnabled = !wavesEnabled
    setWavesEnabled(wavesEnabled)
  }

  function toggleBannerTitleEnabled() {
    bannerTitleEnabled = !bannerTitleEnabled
    setBannerTitleEnabled(bannerTitleEnabled)
  }

  function toggleSakuraShow() {
    sakuraShowEnabled = !sakuraShowEnabled
    setSakuraShow(sakuraShowEnabled)
  }

  function resetSakuraShow() {
    sakuraShowEnabled = defaultSakuraShowEnabled
    setSakuraShow(sakuraShowEnabled)
  }
  function switchWallpaperMode(newMode: WALLPAPER_MODE) {
    wallpaperMode = newMode
    setWallpaperMode(newMode)
  }

  function checkScreenSize() {
    isSmallScreen = window.innerWidth < 1200
    if (isSmallScreen) {
      currentLayout = 'list'
    }
  }

  function switchLayout() {
    if (!mounted || isSmallScreen || isSwitching) return

    isSwitching = true
    currentLayout = currentLayout === 'list' ? 'grid' : 'list'
    localStorage.setItem('postListLayout', currentLayout)

    // 触发自定义事件，通知页面布局已改变
    const event = new CustomEvent('layoutChange', {
      detail: { layout: currentLayout },
    })
    window.dispatchEvent(event)

    // 动画完成后重置状态
    setTimeout(() => {
      isSwitching = false
    }, 500)
  }

  onMount(() => {
    mounted = true
    checkScreenSize()

    // 从localStorage读取保存的壁纸模式
    wallpaperMode = getStoredWallpaperMode()

    // 从localStorage读取水波纹动画状态
    wavesEnabled = getStoredWavesEnabled()

    // 从localStorage读取横幅标题状态
    bannerTitleEnabled = getStoredBannerTitleEnabled()

    // 从localStorage读取樱花特效状态
    sakuraShowEnabled = getStoredSakuraShow()

    // 从localStorage读取用户偏好布局
    const savedLayout = localStorage.getItem('postListLayout')
    if (savedLayout && (savedLayout === 'list' || savedLayout === 'grid')) {
      currentLayout = savedLayout
    } else {
      currentLayout = siteConfig.postListLayout.defaultMode
    }

    // 监听窗口大小变化
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  })

  // 监听布局变化事件
  onMount(() => {
    const handleCustomEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ layout: 'list' | 'grid' }>
      currentLayout = customEvent.detail.layout
    }

    window.addEventListener('layoutChange', handleCustomEvent)

    return () => {
      window.removeEventListener('layoutChange', handleCustomEvent)
    }
  })

  $effect(() => {
    if (hue || hue === 0) {
      setHue(hue)
    }
  })
</script>

{#if hasAnyContent}
  <div id="display-setting" class="float-panel float-panel-closed absolute transition-all w-80 right-4 px-4 py-2">
    <!-- Theme Color Section -->
    {#if showThemeColor}
      <div class="mt-2 mb-2">
        <div class="flex flex-row gap-2 mb-2 items-center justify-between">
          <div
            class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
                before:w-1 before:h-4 before:rounded-md before:bg-(--primary)
                before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2"
          >
            {i18n(I18nKey.themeColor)}
            <button
              aria-label="Reset to Default"
              class="btn-regular w-7 h-7 rounded-md active:scale-90"
              class:opacity-0={hue === defaultHue}
              class:pointer-events-none={hue === defaultHue}
              onclick={resetHue}
            >
              <div class="text-(--btn-content)">
                <Icon icon="fa7-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
              </div>
            </button>
          </div>
          <div class="flex gap-1">
            <div
              id="hueValue"
              class="transition bg-(--btn-regular-bg) w-10 h-7 rounded-md flex justify-center
                font-bold text-sm items-center text-(--btn-content)"
            >
              {hue}
            </div>
          </div>
        </div>
        <div class="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none">
          <input aria-label={i18n(I18nKey.themeColor)} type="range" min="0" max="360" bind:value={hue} class="slider" id="colorSlider" step="5" style="width: 100%" />
        </div>
      </div>
    {/if}

    <!-- Wallpaper Mode Section -->
    {#if isWallpaperSwitchable}
      <div class="mt-2 mb-2">
        <div
          class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3 mb-2
                before:w-1 before:h-4 before:rounded-md before:bg-(--primary)
                before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2"
        >
          {i18n(I18nKey.wallpaperMode)}
          <button
            aria-label="Reset to Default"
            class="btn-regular w-7 h-7 rounded-md active:scale-90"
            class:opacity-0={wallpaperMode === defaultWallpaperMode}
            class:pointer-events-none={wallpaperMode === defaultWallpaperMode}
            onclick={resetWallpaperMode}
          >
            <div class="text-(--btn-content)">
              <Icon icon="fa7-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
            </div>
          </button>
        </div>
        <div class="space-y-1 px-1">
          <button
            class="w-full btn-regular rounded-md py-2 px-3 flex items-center gap-3 text-left active:scale-95 transition-all relative overflow-hidden"
            class:opacity-60={wallpaperMode !== WALLPAPER_BANNER}
            class:bg-(--btn-regular-bg-hover)={wallpaperMode === WALLPAPER_BANNER}
            onclick={() => switchWallpaperMode(WALLPAPER_BANNER)}
          >
            <Icon icon="material-symbols:image-outline" class="text-[1.25rem] shrink-0"></Icon>
            <span class="text-sm flex-1">{i18n(I18nKey.wallpaperBannerMode)}</span>
            {#if wallpaperMode === WALLPAPER_BANNER}
              <Icon icon="material-symbols:check-circle" class="text-[1rem] shrink-0 text-(--primary)"></Icon>
            {/if}
          </button>
          <button
            class="w-full btn-regular rounded-md py-2 px-3 flex items-center gap-3 text-left active:scale-95 transition-all relative overflow-hidden"
            class:opacity-60={wallpaperMode !== WALLPAPER_OVERLAY}
            class:bg-(--btn-regular-bg-hover)={wallpaperMode === WALLPAPER_OVERLAY}
            onclick={() => switchWallpaperMode(WALLPAPER_OVERLAY)}
          >
            <Icon icon="material-symbols:wallpaper" class="text-[1.25rem] shrink-0"></Icon>
            <span class="text-sm flex-1">{i18n(I18nKey.wallpaperOverlayMode)}</span>
            {#if wallpaperMode === WALLPAPER_OVERLAY}
              <Icon icon="material-symbols:check-circle" class="text-[1rem] shrink-0 text-(--primary)"></Icon>
            {/if}
          </button>
          <button
            class="w-full btn-regular rounded-md py-2 px-3 flex items-center gap-3 text-left active:scale-95 transition-all relative overflow-hidden"
            class:opacity-60={wallpaperMode !== WALLPAPER_NONE}
            class:bg-(--btn-regular-bg-hover)={wallpaperMode === WALLPAPER_NONE}
            onclick={() => switchWallpaperMode(WALLPAPER_NONE)}
          >
            <Icon icon="material-symbols:hide-image-outline" class="text-[1.25rem] shrink-0"></Icon>
            <span class="text-sm flex-1">{i18n(I18nKey.wallpaperNoneMode)}</span>
            {#if wallpaperMode === WALLPAPER_NONE}
              <Icon icon="material-symbols:check-circle" class="text-[1rem] shrink-0 text-(--primary)"></Icon>
            {/if}
          </button>
        </div>
      </div>
    {/if}

    <!-- Banner Settings Section -->
    {#if wallpaperMode === WALLPAPER_BANNER && hasBannerSettings}
      <div class="mt-2 mb-2">
        <div
          class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3 mb-2
                before:w-1 before:h-4 before:rounded-md before:bg-(--primary)
                before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2"
        >
          {i18n(I18nKey.bannerSettings)}
        </div>
        <div class="space-y-1 px-1">
          <!-- Banner Title Switch -->
          {#if isBannerTitleSwitchable}
            <button
              class="w-full btn-regular rounded-md py-2 px-3 flex items-center gap-3 text-left active:scale-95 transition-all relative overflow-hidden"
              class:bg-(--btn-regular-bg-hover)={bannerTitleEnabled}
              onclick={toggleBannerTitleEnabled}
            >
              <Icon icon="material-symbols:titlecase-rounded" class="text-[1.25rem] shrink-0"></Icon>
              <span class="text-sm flex-1">{i18n(I18nKey.bannerTitle)}</span>
              <div class="w-10 h-5 rounded-full transition-all duration-200 relative" class:bg-(--primary)={bannerTitleEnabled} class:bg-(--btn-regular-bg-active)={!bannerTitleEnabled}>
                <div class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200" class:left-0.5={!bannerTitleEnabled} class:left-5={bannerTitleEnabled}></div>
              </div>
            </button>
          {/if}
          <!-- Waves Animation Switch -->
          {#if isWavesSwitchable}
            <button
              class="w-full btn-regular rounded-md py-2 px-3 flex items-center gap-3 text-left active:scale-95 transition-all relative overflow-hidden"
              class:bg-(--btn-regular-bg-hover)={wavesEnabled}
              onclick={toggleWavesEnabled}
            >
              <Icon icon="material-symbols:airwave-rounded" class="text-[1.25rem] shrink-0"></Icon>
              <span class="text-sm flex-1">{i18n(I18nKey.wavesAnimation)}</span>
              <div class="w-10 h-5 rounded-full transition-all duration-200 relative" class:bg-(--primary)={wavesEnabled} class:bg-(--btn-regular-bg-active)={!wavesEnabled}>
                <div class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200" class:left-0.5={!wavesEnabled} class:left-5={wavesEnabled}></div>
              </div>
            </button>
          {/if}
        </div>
      </div>
    {/if}
    <!-- 特效设置 -->
    {#if hasEffectSettings}
      <div class="mt-2 mb-2">
        <div
          class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3 mb-2
            before:w-1 before:h-4 before:rounded-md before:bg-(--primary)
            before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2"
        >
          {i18n(I18nKey.effectSettings)}
        </div>
        <div class="space-y-1 px-1">
          {#if isSakuraSwitchable}
            <button
              class="w-full btn-regular rounded-md py-2 px-3 flex items-center gap-3 text-left active:scale-95 transition-all relative overflow-hidden"
              class:bg-(--btn-regular-bg-hover)={sakuraShowEnabled}
              onclick={toggleSakuraShow}
            >
              <span>🌸</span>
              <!-- <Icon icon="hugeicons:sakura" class="text-[1.25rem] shrink-0"></Icon> -->
              <span class="text-sm flex-1">{i18n(I18nKey.effectSakuraShow)}</span>
              <div class="w-10 h-5 rounded-full transition-all duration-200 relative" class:bg-(--primary)={sakuraShowEnabled} class:bg-(--btn-regular-bg-active)={!sakuraShowEnabled}>
                <div class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200" class:left-0.5={!sakuraShowEnabled} class:left-5={sakuraShowEnabled}></div>
              </div>
            </button>
          {/if}
        </div>
      </div>
    {/if}

    <!-- Layout Switch Section -->
    {#if wallpaperMode === WALLPAPER_BANNER}
      <div class="mt-2 mb-2">
        <div
          class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3 mb-2
                before:w-1 before:h-4 before:rounded-md before:bg-(--primary)
                before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2"
        >
          {i18n(I18nKey.postListLayout)}
          <button
            aria-label="Reset to Default"
            class="btn-regular w-7 h-7 rounded-md active:scale-90"
            class:opacity-0={currentLayout === defaultLayout}
            class:pointer-events-none={currentLayout === defaultLayout}
            onclick={resetLayout}
          >
            <div class="text-(--btn-content)">
              <Icon icon="fa7-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
            </div>
          </button>
        </div>
        <div class="flex gap-2">
          <button
            aria-label={i18n(I18nKey.postListLayoutList)}
            class="flex-1 btn-regular rounded-md py-2 px-3 flex items-center justify-center gap-2 active:scale-95 transition-all relative overflow-hidden"
            class:opacity-60={currentLayout !== 'list'}
            class:bg-(--btn-regular-bg-hover)={currentLayout === 'list'}
            disabled={isSwitching}
            onclick={switchLayout}
            title={i18n(I18nKey.postListLayoutList)}
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            <span class="text-xs font-medium">{i18n(I18nKey.postListLayoutList)}</span>
            {#if currentLayout === 'list'}
              <Icon icon="material-symbols:check-circle" class="text-[1rem] shrink-0 text-(--primary)"></Icon>
            {/if}
          </button>
          <button
            aria-label={i18n(I18nKey.postListLayoutGrid)}
            class="flex-1 btn-regular rounded-md py-2 px-3 flex items-center justify-center gap-2 active:scale-95 transition-all relative overflow-hidden"
            class:opacity-60={currentLayout !== 'grid'}
            class:bg-(--btn-regular-bg-hover)={currentLayout === 'grid'}
            disabled={isSwitching}
            onclick={switchLayout}
            title={i18n(I18nKey.postListLayoutGrid)}
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
            </svg>
            <span class="text-xs font-medium">{i18n(I18nKey.postListLayoutGrid)}</span>
            {#if currentLayout === 'grid'}
              <Icon icon="material-symbols:check-circle" class="text-[1rem] shrink-0 text-(--primary)"></Icon>
            {/if}
          </button>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style lang="stylus">
    #display-setting
      input[type="range"]
        -webkit-appearance none
        height 1.5rem
        background-image var(--color-selection-bar)
        transition background-image 0.15s ease-in-out

        /* Input Thumb */
        &::-webkit-slider-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

        &::-moz-range-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          border-width 0
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

        &::-ms-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

</style>
