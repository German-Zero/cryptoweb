<script setup lang="ts">
import type { CryptoPrice } from '@/types/crypto'
import { ref, onMounted } from 'vue'

const prices = ref<Record<string, CryptoPrice>>({})

onMounted(async () => {
  const coins = ['btc', 'eth', 'usdt']

  const results = await Promise.all(
    coins.map((c) =>
      fetch(`https://criptoya.com/api/satoshitango/${c}/ars/1`).then((r) => r.json()),
    ),
  )

  coins.forEach((c, i) => {
    prices.value[c] = results[i]
  })
})
</script>

<template>
  <div class="h-full p-6 bg-[#0d0d14]">
    <h2 class="text-sm text-gray-400 mb-6 uppercase tracking-wider">MERCADO</h2>

    <div class="space-y-4">
      <div
        v-for="(p, key) in prices"
        :key="key"
        class="bg-[#12121a] p-4 rounded-xl border border-gray-800"
      >
        <p class="text-xs text-gray-500 uppercase">
          {{ key }}
        </p>

        <p class="text-lg font-semibold text-violet-400 mt-1">${{ p.totalAsk }}</p>
      </div>
    </div>
  </div>
</template>
